import { Alert, Linking, Platform } from "react-native";
import { useState, useEffect, useContext } from "react";
import { ProductEntity } from "../model/product";
import { GlobalSubscriptionContext } from "@/src/context/subscriptionContext";
import {
  insertNewSubscription,
  switchSubscription,
} from "@/src/services/firebase/subscriptions";
import { useIAP, ErrorCode, PurchaseAndroid } from "expo-iap";
import { reaisToCents } from "@/src/utils/convertCurrency";
import { parseBillingPeriod } from "@/src/utils/parseBillingPeriod";
import { GlobalUserContext } from "@/src/context/userContext";
import Constants from "expo-constants";
import { validatePurchaseToken } from "@/src/services/playBilling/purchase";

export const useSubscriptionsViewModel = () => {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const { currentUser } = useContext(GlobalUserContext);
  const { currentSubscription, setCurrentSubscription } = useContext(
    GlobalSubscriptionContext
  );
  const [loading, setLoading] = useState(false);
  const productIds = ["plan_essencial", "plan_premium", "plan_premium_annual"];

  const {
    connected,
    fetchProducts,
    subscriptions,
    requestPurchase,
    finishTransaction,
  } = useIAP({
    onPurchaseSuccess: async (purchase) => {
      await handlePurchaseUpdate(purchase);
    },

    onPurchaseError: (error) => {
      setLoading(false);

      if (error.code === ErrorCode.UserCancelled) {
        return;
      }

      Alert.alert(
        "Oops!",
        "Não foi possível completar a sua compra. Tente novamente."
      );
      console.error("Purchase error:", error);
    },
  });

  const showSuccessMessage = (productId: string) => {
    Alert.alert(
      "Maravilha!",
      `Seu plano ${productId} foi ativado com sucesso.`
    );
    setLoading(false);
  };

  const updateSubscriptionInFirebase = async (
    productId: string,
    purchaseId: string,
    purchaseToken: string
  ) => {
    try {
      if (!productId || !currentSubscription?.purchaseToken)
        throw new Error("Invalid Subscription.");
      const newSubscription = {
        ...currentSubscription,
        status: "active" as "active" | "inactive",
        productId,
        purchaseId,
        purchaseToken,
      };

      await switchSubscription(newSubscription);

      setCurrentSubscription(newSubscription);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAndroidSubscriptionSwitch = async (newSubscriptionId: string) => {
    try {
      setLoading(true);

      if (!currentSubscription?.purchaseToken) {
        throw new Error("No active subscription found");
      }

      const newSubscription = subscriptions.find(
        (sub) => sub.id === newSubscriptionId
      );
      if (!newSubscription) {
        throw new Error("New subscription product not found");
      }

      if ("subscriptionOfferDetailsAndroid" in newSubscription) {
        const subscriptionOffers = (
          newSubscription.subscriptionOfferDetailsAndroid ?? []
        ).map((offer) => ({
          sku: newSubscription.id,
          offerToken: offer.offerToken,
        }));

        await requestPurchase({
          request: {
            ios: {
              sku: newSubscriptionId,
            },
            android: {
              skus: [newSubscriptionId],
              subscriptionOffers,
              purchaseTokenAndroid: currentSubscription.purchaseToken,
              replacementModeAndroid: 1,
            },
          },
          type: "subs",
        });
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const insertSubscriptionInFirebase = async (
    productId: string,
    purchaseId: string,
    purchaseToken: string
  ) => {
    try {
      if (!productId || !currentUser?.user.email)
        throw new Error("Invalid Subscription.");
      const newSubscription = {
        userId: currentUser.user.uid,
        productId,
        userName: currentUser.user.displayName ?? currentUser?.user.email,
        userEmail: currentUser.user.email,
        status: "active" as "active" | "inactive",
        platform: Platform.OS,
        purchaseId,
        purchaseToken,
      };

      const insertedSubscription = await insertNewSubscription(
        newSubscription.userId,
        newSubscription.productId,
        newSubscription.userName,
        newSubscription.userEmail,
        newSubscription.status,
        newSubscription.platform,
        newSubscription.purchaseId,
        newSubscription.purchaseToken
      );

      setCurrentSubscription({ id: insertedSubscription, ...newSubscription });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseUpdate = async (purchase: PurchaseAndroid) => {
    try {
      setLoading(true);

      if (!purchase.purchaseToken)
        throw new Error("Invalid purchase. Token not generated.");

      const validationResult = await validatePurchaseToken(
        purchase.purchaseToken
      );

      if (validationResult.isValid) {
        await finishTransaction({
          purchase,
        });

        if (
          currentSubscription &&
          currentSubscription?.productId !== purchase.productId
        ) {
          await updateSubscriptionInFirebase(
            purchase.productId,
            purchase.id,
            purchase.purchaseToken
          );
        } else {
          await insertSubscriptionInFirebase(
            purchase.productId,
            purchase.id,
            purchase.purchaseToken
          );
        }

        showSuccessMessage(purchase.productId);
      } else {
        Alert.alert(
          "Oops!",
          "Sua compra não pôde ser concluída. Tente novamente ou entre em contato com o suporte."
        );
        throw new Error("Purchase was not validated");
      }
    } catch (error) {
      console.error("Error handling purchase:", error);
      Alert.alert("Oops", "Seu pagamento não foi processado.");
      setLoading(false);
    }
  };

  const handlePurchaseSubscription = async (subscriptionId: string) => {
    if (!connected) {
      Alert.alert(
        "Sem conexão!",
        "A conexão com a loja não foi estabelecida. Tente novamente mais tarde."
      );
      return;
    }

    if (
      currentSubscription?.status === "active" &&
      currentSubscription.productId === subscriptionId
    ) {
      handleCancelSubscription();
      return;
    } else if (
      currentSubscription?.status === "active" &&
      currentSubscription.productId !== subscriptionId
    ) {
      handleAndroidSubscriptionSwitch(subscriptionId);
      return;
    } else {
      try {
        setLoading(true);

        const subscription = subscriptions.find((s) => s.id === subscriptionId);

        if (subscription && "subscriptionOfferDetailsAndroid" in subscription) {
          const subscriptionOffers =
            subscription?.subscriptionOfferDetailsAndroid?.map((offer) => ({
              sku: subscriptionId,
              offerToken: offer.offerToken,
            })) || [{ sku: subscriptionId, offerToken: "" }];

          await requestPurchase({
            request: {
              ios: {
                sku: subscriptionId,
              },
              android: {
                skus: [subscriptionId],
                subscriptionOffers,
              },
            },
            type: "subs",
          });
        }
      } catch (error) {
        setLoading(false);
        console.error("Subscription request failed:", error);
      }
    }
  };

  const sortProductsByAmount = (
    productsList: ProductEntity[],
    sortingOrder: "asc" | "desc"
  ) => {
    const sortedProducts = productsList.sort((a, b) => {
      if (sortingOrder === "desc") {
        return a.amount - b.amount;
      } else {
        return b.amount - a.amount;
      }
    });

    return sortedProducts;
  };

  const handleCancelSubscription = () => {
    const packageName =
      Platform.OS === "android"
        ? Constants.expoConfig?.android?.package
        : Constants.expoConfig?.ios?.bundleIdentifier;
    const url = `https://play.google.com/store/account/subscriptions?package=${packageName}`;
    Linking.openURL(url);
  };

  useEffect(() => {
    if (connected) {
      fetchProducts({
        skus: productIds,
        type: "subs",
      });
    }
  }, [connected]);

  useEffect(() => {
    if (subscriptions) {
      const fetchedProducts = subscriptions.map((sub) => {
        if ("subscriptionOfferDetailsAndroid" in sub) {
          return {
            productId: sub.id,
            name: sub.displayName ?? sub.title,
            description: sub.description,
            amount: reaisToCents(Number(sub.price)),
            currency: sub.currency,
            interval: parseBillingPeriod(
              sub.subscriptionOfferDetailsAndroid[0].pricingPhases
                .pricingPhaseList[0].billingPeriod
            ),
          } as ProductEntity;
        }
      });

      setProducts(
        sortProductsByAmount(
          fetchedProducts.filter((product) => product !== undefined),
          "asc"
        )
      );
    }
  }, [subscriptions]);

  return {
    products,
    loading,
    currentSubscription,
    handlePurchaseSubscription,
    handleAndroidSubscriptionSwitch,
  };
};
