import { Alert, Linking, Platform } from "react-native";
import { useState, useEffect, useContext } from "react";
import { GlobalSubscriptionContext } from "@/src/context/subscriptionContext";
import { GlobalProductsContext } from "@/src/context/productsContext";
import {
  insertNewSubscription,
  switchSubscription,
  getSubscriptionByPurchaseToken,
} from "@/src/services/firebase/subscriptions";
import { useIAP, ErrorCode, PurchaseAndroid } from "expo-iap";
import { GlobalUserContext } from "@/src/context/userContext";
import Constants from "expo-constants";
import { validatePurchaseToken } from "@/src/services/playBilling/purchase";
import { useTranslation } from "react-i18next";

export const useSubscriptionsViewModel = () => {
  const { t } = useTranslation();
  const { currentProducts, productIds } = useContext(GlobalProductsContext);
  const { currentUser } = useContext(GlobalUserContext);
  const { currentSubscription, setCurrentSubscription } = useContext(
    GlobalSubscriptionContext
  );
  const [loading, setLoading] = useState(false);

  const subscriptionManageWarning = () => {
    if (currentSubscription) {
      return currentSubscription?.platform === Platform.OS
        ? ""
        : t("subscription_manage_warning", {
            platform: currentSubscription?.platform,
          });
    }

    return "";
  };

  const {
    connected,
    subscriptions,
    requestPurchase,
    finishTransaction,
    fetchProducts,
  } = useIAP({
    onPurchaseSuccess: async (purchase) => {
      await handlePurchaseUpdate(purchase);
    },

    onPurchaseError: (error) => {
      setLoading(false);

      if (error.code === ErrorCode.UserCancelled) {
        return;
      }

      Alert.alert(t("something_wrong"), error.responseCode?.toString());
    },
  });

  const checkSubscriptionExists = async (purchaseToken: string) => {
    try {
      const subscriptionFound = await getSubscriptionByPurchaseToken(
        purchaseToken
      );
      return subscriptionFound;
    } catch (err) {
      console.log(err);
    }
  };

  const showSuccessMessage = (productId: string) => {
    Alert.alert(
      t("great"),
      t("subscription_activated", { product_id: productId })
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
        throw new Error(t("invalid_subscription"));
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
        throw new Error(t("no_active_subscriptions"));
      }

      const newSubscription = subscriptions.find(
        (sub) => sub.id === newSubscriptionId
      );
      if (!newSubscription) {
        throw new Error(t("new_subs_product_not_found"));
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
        throw new Error(t("invalid_subscription"));
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

      if (!purchase.purchaseToken) throw new Error(t("invalid_purchase_token"));

      const validationResult = await validatePurchaseToken(
        purchase.purchaseToken
      );

      if (validationResult.isValid) {
        await finishTransaction({
          purchase,
        });

        if (
          currentSubscription &&
          currentSubscription.productId !== purchase.productId
        ) {
          await updateSubscriptionInFirebase(
            purchase.productId,
            purchase.id,
            purchase.purchaseToken
          );
        } else {
          const subscriptionExist = await checkSubscriptionExists(
            purchase.purchaseToken
          );
          if (!subscriptionExist) {
            await insertSubscriptionInFirebase(
              purchase.productId,
              purchase.id,
              purchase.purchaseToken
            );
          }
        }

        showSuccessMessage(purchase.productId);
      } else {
        throw new Error(t("purchase_not_valid"));
      }
    } catch (error) {
      Alert.alert(t("error"), `${error}`);
      setLoading(false);
    }
  };

  const handlePurchaseSubscription = async (subscriptionId: string) => {
    if (!connected) {
      Alert.alert(t("no_store_connection"), t("no_store_connection_msg"));
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
      } finally {
        setLoading(false);
      }
    }
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

  return {
    currentProducts,
    loading,
    currentSubscription,
    handlePurchaseSubscription,
    handleAndroidSubscriptionSwitch,
    subscriptionManageWarning,
  };
};
