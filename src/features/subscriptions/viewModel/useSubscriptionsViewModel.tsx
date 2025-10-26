import { Alert, Linking, Platform } from "react-native";
import { useState, useEffect, useContext } from "react";
import { ProductEntity } from "../model/product";
import { GlobalSubscriptionContext } from "@/src/context/subscriptionContext";
import {
  updateSubscription,
  insertNewSubscription,
} from "@/src/services/firebase/subscriptions";
import { useIAP, ErrorCode } from "expo-iap";
import { reaisToCents } from "@/src/utils/convertCurrency";
import { parseBillingPeriod } from "@/src/utils/parseBillingPeriod";
import { GlobalUserContext } from "@/src/context/userContext";
import Constants from "expo-constants";

export const useSubscriptionsViewModel = () => {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const { currentUser } = useContext(GlobalUserContext);
  const { currentSubscription, setCurrentSubscription } = useContext(
    GlobalSubscriptionContext
  );
  const [loading, setLoading] = useState(false);

  const insertSubscriptionInFirebase = async (productId: string) => {
    try {
      if (!productId || !currentUser?.user.email)
        throw new Error("Invalid Subscription.");
      const newSubscription = {
        userId: currentUser.user.uid,
        productId,
        userName: currentUser.user.displayName ?? currentUser?.user.email,
        userEmail: currentUser.user.email,
        status: "active" as "active" | "inactive",
      };

      await insertNewSubscription(
        newSubscription.userId,
        newSubscription.productId,
        newSubscription.userName,
        newSubscription.userEmail,
        newSubscription.status
      );

      setCurrentSubscription(newSubscription);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSubscriptionInFirebase = async (productId: string) => {
    try {
      if (!currentSubscription || !currentSubscription.id)
        throw new Error("Invalid Subscription.");
      const updatedSubscription = {
        ...currentSubscription,
        productId,
      };

      await updateSubscription(updatedSubscription);
      setCurrentSubscription(updatedSubscription);
    } catch (error) {
      console.log(error);
    }
  };

  const showSuccessMessage = (productId: string) => {
    Alert.alert(
      "Thank You!",
      `Premium subscription ${productId} activated successfully.`
    );
  };

  const handlePurchaseUpdate = async (purchase: any) => {
    try {
      setLoading(true);
      console.log("Processing purchase:", purchase);

      const purchaseId = purchase.id;

      const validationResult = { isValid: true }; //await handleValidateReceipt(purchase);

      if (validationResult.isValid) {
        await finishTransaction({
          purchase,
        });

        await insertSubscriptionInFirebase(purchase.productId);

        // Show success message
        showSuccessMessage(purchase.productId);
      } else {
        Alert.alert(
          "Validation Error",
          "Purchase could not be validated. Please contact support."
        );
      }
    } catch (error) {
      console.error("Error handling purchase:", error);
      Alert.alert("Error", "Failed to process purchase.");
    } finally {
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
      console.log("Purchase successful:", purchase);
      await handlePurchaseUpdate(purchase);
    },
    onPurchaseError: (error) => {
      setLoading(false);

      // Don't show error for user cancellation
      if (error.code === ErrorCode.UserCancelled) {
        return;
      }

      Alert.alert(
        "Purchase Error",
        "Failed to complete purchase. Please try again."
      );
      console.error("Purchase error:", error);
    },
  });
  const productIds = ["plan_essencial", "plan_premium", "plan_premium_annual"];

  const handlePurchaseSubscription = async (subscriptionId: string) => {
    if (!connected) {
      Alert.alert(
        "Not Connected",
        "Store connection unavailable. Please try again later."
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
