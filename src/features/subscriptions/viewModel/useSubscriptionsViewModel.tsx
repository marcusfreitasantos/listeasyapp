import { Alert, Linking, Platform } from "react-native";
import { useState, useEffect, useContext } from "react";
import { GlobalSubscriptionContext } from "@/src/context/subscriptionContext";
import { GlobalProductsContext } from "@/src/context/productsContext";
import {
  insertNewSubscription,
  switchSubscription,
  getSubscriptionByPurchaseToken,
} from "@/src/services/firebase/subscriptions";
import { useIAP, ErrorCode, PurchaseAndroid, PurchaseIOS } from "expo-iap";
import { GlobalUserContext } from "@/src/context/userContext";
import Constants from "expo-constants";
import {
  validatePurchaseTokenFromGooglePlay,
  validatePurchaseFromAppStore,
} from "@/src/services/api/purchase";
import { useTranslation } from "react-i18next";
import * as Crypto from "expo-crypto";
import {
  getPurchaseDeduplicationKey,
  shouldProcessPurchase,
} from "./purchaseDeduplication";
import {
  logAnalyticsEvent,
  logHandledError,
  withPerformanceTrace,
} from "@/src/services/observability";

export const useSubscriptionsViewModel = () => {
  const { t } = useTranslation();
  const { currentProducts, productIds } = useContext(GlobalProductsContext);
  const { currentUser } = useContext(GlobalUserContext);
  const { currentSubscription, setCurrentSubscription } = useContext(
    GlobalSubscriptionContext,
  );
  const [loading, setLoading] = useState(false);
  const [appAccountToken, setAppAccountToken] = useState<string>("");
  const [processingPurchases] = useState(() => new Set<string>());
  const [processedPurchases] = useState(() => new Set<string>());

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

    onPurchaseError: async (error) => {
      setLoading(false);

      if (error.code === ErrorCode.UserCancelled) {
        await logAnalyticsEvent("purchase_cancelled", {
          platform: Platform.OS,
        });
        return;
      }

      await logHandledError("purchase_request", error, {
        platform: Platform.OS,
      });
      Alert.alert(t("something_wrong"), error.responseCode?.toString());
    },
  });

  const showSuccessMessage = (productId: string) => {
    Alert.alert(
      t("great"),
      t("subscription_activated", { product_id: productId }),
    );
    setLoading(false);
  };

  type updateInsertSuscriptionParams = {
    productId: string;
    purchaseId: string;
    purchaseToken: string;
  };

  const updateSubscriptionInFirebase = async ({
    productId,
    purchaseId,
    purchaseToken,
  }: updateInsertSuscriptionParams) => {
    try {
      if (!productId || !currentSubscription?.purchaseToken)
        throw new Error(t("invalid_subscription"));
      const newSubscription = {
        ...currentSubscription,
        status: "active" as "active" | "inactive",
        productId,
        purchaseId,
        purchaseToken,
        appAccountToken,
      };

      await switchSubscription(newSubscription);

      setCurrentSubscription(newSubscription);
      await logAnalyticsEvent("subscription_switched", {
        old_product_id: currentSubscription.productId,
        new_product_id: productId,
        platform: Platform.OS,
      });
    } catch (error) {
      await logHandledError("switch_subscription", error, {
        platform: Platform.OS,
      });
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
        (sub) => sub.id === newSubscriptionId,
      );
      if (!newSubscription) {
        throw new Error(t("new_subs_product_not_found"));
      }

      if (Platform.OS === "android") {
        if (!("subscriptionOfferDetailsAndroid" in newSubscription)) {
          throw new Error(t("subscription_not_found"));
        }

        const subscriptionOffers = (
          newSubscription.subscriptionOfferDetailsAndroid ?? []
        ).map((offer) => ({
          sku: newSubscription.id,
          offerToken: offer.offerToken,
        }));

        await requestPurchase({
          request: {
            android: {
              skus: [newSubscriptionId],
              subscriptionOffers,
              purchaseTokenAndroid: currentSubscription.purchaseToken,
              replacementModeAndroid: 1,
            },
          },
          type: "subs",
        });
      } else if (Platform.OS === "ios") {
        const accountToken = Crypto.randomUUID();
        setAppAccountToken(accountToken);

        await requestPurchase({
          request: {
            ios: {
              sku: newSubscriptionId,
              appAccountToken: accountToken,
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

  const insertSubscriptionInFirebase = async ({
    productId,
    purchaseId,
    purchaseToken,
  }: updateInsertSuscriptionParams) => {
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
        appAccountToken,
      };

      const insertedSubscription = await insertNewSubscription(
        newSubscription.userId,
        newSubscription.productId,
        newSubscription.userName,
        newSubscription.userEmail,
        newSubscription.status,
        newSubscription.platform,
        newSubscription.purchaseId,
        newSubscription.purchaseToken,
        newSubscription.appAccountToken,
      );

      setCurrentSubscription({ id: insertedSubscription, ...newSubscription });
      await logAnalyticsEvent("purchase", {
        product_id: productId,
        platform: Platform.OS,
        currency:
          currentProducts?.find((product) => product.productId === productId)
            ?.currency ?? "unknown",
      });
    } catch (error) {
      await logHandledError("save_subscription", error, {
        platform: Platform.OS,
      });
    } finally {
      setLoading(false);
    }
  };

  const validatePurchaseBasedOnPlatform = async (
    purchase: PurchaseAndroid | PurchaseIOS,
  ) => {
    if (!purchase.purchaseToken) throw new Error(t("invalid_purchase_token"));

    if (Platform.OS === "android") {
      return await validatePurchaseTokenFromGooglePlay(purchase.purchaseToken);
    } else if (Platform.OS === "ios") {
      return await validatePurchaseFromAppStore(purchase.purchaseToken);
    } else {
      return null;
    }
  };

  const handlePurchaseUpdate = async (
    purchase: PurchaseAndroid | PurchaseIOS,
  ) => {
    const purchaseDeduplicationData = {
      purchaseToken: purchase.purchaseToken || "",
      id: purchase.id,
      productId: purchase.productId,
    };
    const purchaseKey = getPurchaseDeduplicationKey(purchaseDeduplicationData);

    if (
      !shouldProcessPurchase(
        purchaseKey,
        processingPurchases,
        processedPurchases,
      )
    ) {
      return;
    }

    processingPurchases.add(purchaseKey);

    try {
      setLoading(true);

      if (!purchase.purchaseToken) throw new Error(t("invalid_purchase_token"));

      const validationResult = await validatePurchaseBasedOnPlatform(purchase);

      if (validationResult.isValid) {
        await finishTransaction({
          purchase,
        });

        const subscriptionData = {
          productId: purchase.productId,
          purchaseId: Platform.OS === "android" ? purchase.id : "",
          purchaseToken:
            Platform.OS === "android" ? purchase.purchaseToken : "",
        };

        if (
          currentSubscription &&
          currentSubscription.productId !== purchase.productId
        ) {
          await updateSubscriptionInFirebase(subscriptionData);
        } else {
          await insertSubscriptionInFirebase(subscriptionData);
        }

        processedPurchases.add(purchaseKey);
        showSuccessMessage(purchase.productId);
      } else {
        throw new Error(t("purchase_not_valid"));
      }
    } catch (error) {
      await logHandledError("process_purchase", error, {
        platform: Platform.OS,
      });
      Alert.alert(t("error"), `${error}`);
      setLoading(false);
    } finally {
      processingPurchases.delete(purchaseKey);
    }
  };

  const handlePurchaseSubscription = async (subscriptionId: string) => {
    if (!connected) {
      await logAnalyticsEvent("checkout_unavailable", {
        platform: Platform.OS,
      });
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
        await logAnalyticsEvent("begin_checkout", {
          product_id: subscriptionId,
          platform: Platform.OS,
          currency:
            currentProducts?.find(
              (product) => product.productId === subscriptionId,
            )?.currency ?? "unknown",
        });

        const subscription = subscriptions.find((s) => s.id === subscriptionId);

        if (!subscription) throw new Error(t("subscription_not_found"));

        if (Platform.OS === "ios") {
          const accountToken = Crypto.randomUUID();
          setAppAccountToken(accountToken);

          await requestPurchase({
            request: {
              ios: {
                sku: subscriptionId,
                appAccountToken: accountToken,
              },
            },
            type: "subs",
          });
        } else if (Platform.OS === "android") {
          let subscriptionOffers = [{ sku: subscriptionId, offerToken: "" }];

          if (!("subscriptionOfferDetailsAndroid" in subscription)) {
            throw new Error(t("subscription_not_found"));
          }

          subscriptionOffers =
            subscription?.subscriptionOfferDetailsAndroid?.map((offer) => ({
              sku: subscriptionId,
              offerToken: offer.offerToken,
            })) || [{ sku: subscriptionId, offerToken: "" }];

          await requestPurchase({
            request: {
              android: {
                skus: [subscriptionId],
                subscriptionOffers,
              },
            },
            type: "subs",
          });
        } else {
          throw new Error(t("unsupported_platform"));
        }
      } catch (error) {
        setLoading(false);
        await logHandledError("request_subscription", error, {
          platform: Platform.OS,
        });
      }
    }
  };

  const handleCancelSubscription = () => {
    const packageName =
      Platform.OS === "android"
        ? Constants.expoConfig?.android?.package
        : Constants.expoConfig?.ios?.bundleIdentifier;
    const url =
      Platform.OS === "android"
        ? `https://play.google.com/store/account/subscriptions?package=${packageName}`
        : `https://apps.apple.com/account/subscriptions`;
    Linking.openURL(url);
  };

  useEffect(() => {
    void logAnalyticsEvent("subscription_viewed", {
      platform: Platform.OS,
      has_active_subscription: currentSubscription?.status === "active",
    });
  }, []);

  useEffect(() => {
    if (connected) {
      void withPerformanceTrace(
        "iap_fetch_products",
        () =>
          fetchProducts({
            skus: productIds,
            type: "subs",
          }),
        { source: "subscriptions" },
      );
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
