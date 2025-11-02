import { Alert, Linking, Platform } from "react-native";
import { useState, useEffect, useContext } from "react";
import { ProductEntity } from "../model/product";
import { GlobalSubscriptionContext } from "@/src/context/subscriptionContext";
import { insertNewSubscription } from "@/src/services/firebase/subscriptions";
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

      await insertNewSubscription(
        newSubscription.userId,
        newSubscription.productId,
        newSubscription.userName,
        newSubscription.userEmail,
        newSubscription.status,
        newSubscription.platform,
        newSubscription.purchaseId,
        newSubscription.purchaseToken
      );

      setCurrentSubscription(newSubscription);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  );
    }
  };

  const showSuccessMessage = (productId: string) => {
    Alert.alert(
      "Maravilha!",
      `Seu plano ${productId} foi ativado com sucesso.`
    );
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

        await insertSubscriptionInFirebase(
          purchase.productId,
          purchase.id,
          purchase.purchaseToken
        );

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

  const {
    connected,
    fetchProducts,
    subscriptions,
    requestPurchase,
    finishTransaction,
    validateReceipt,
  } = useIAP({
    onPurchaseSuccess: async (purchase) => {
      await handlePurchaseUpdate(purchase);
    },
    onPurchaseError: (error) => {
      setLoading(false);

      // Don't show error for user cancellation
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
  const productIds = ["plan_essencial", "plan_premium", "plan_premium_annual"];

  const handlePurchaseSubscription = async (subscriptionId: string) => {
    if (!connected) {
      Alert.alert(
        "Sem conexão!",
        "A conexão com a loja não foi estabelecida. Tente novamente mais tarde."
      );
      return;
    }

    if (currentSubscription?.status === "active") {
      handleCancelSubscription();
      return;
    }

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
    } finally {
      setLoading(false);
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
  };
};
