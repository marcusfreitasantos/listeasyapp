import { Alert, Linking, Platform } from "react-native";
import { useState, useEffect, useContext, useMemo, useRef } from "react";
import { GlobalSubscriptionContext } from "@/src/context/subscriptionContext";
import { GlobalProductsContext } from "@/src/context/productsContext";
import {
  insertNewSubscription,
  switchSubscription,
} from "@/src/services/firebase/subscriptions";
import { useIAP, ErrorCode, PurchaseAndroid, PurchaseIOS } from "expo-iap";
import { GlobalUserContext } from "@/src/context/userContext";
import Constants from "expo-constants";
import {
  validatePurchaseTokenFromGooglePlay,
  validatePurchaseFromAppStore,
  AppStoreDecodedTransaction,
} from "@/src/services/api/purchase";
import { useTranslation } from "react-i18next";
import * as Crypto from "expo-crypto";
import {
  getPurchaseDeduplicationKey,
  shouldProcessPurchase,
} from "./purchaseDeduplication";
import { useObservabilityViewModel } from "@/src/features/observability/viewModel/useObservabilityViewModel";
import { mapStoreSubscriptions } from "../model/mapStoreSubscriptions";

const firstFilledValue = (...values: Array<string | null | undefined>) =>
  values.find((value) => !!value?.trim())?.trim() ?? "";

const buildSubscriptionData = (
  purchase: PurchaseAndroid | PurchaseIOS,
  decodedTransaction?: AppStoreDecodedTransaction,
  sentAppAccountToken?: string,
) => {
  if (Platform.OS === "android") {
    return {
      productId: purchase.productId,
      purchaseId: purchase.id,
      purchaseToken: purchase.purchaseToken || "",
    };
  }

  const iosPurchase = purchase as PurchaseIOS;
  const originalTransactionId = firstFilledValue(
    decodedTransaction?.originalTransactionId,
    iosPurchase.originalTransactionIdentifierIOS,
    decodedTransaction?.transactionId,
    iosPurchase.transactionId,
  );

  return {
    productId: purchase.productId,
    purchaseId: originalTransactionId,
    purchaseToken: originalTransactionId,
    originalTransactionId,
    appAccountToken: firstFilledValue(
      decodedTransaction?.appAccountToken,
      iosPurchase.appAccountToken,
      sentAppAccountToken,
    ),
  };
};

export const useSubscriptionsViewModel = () => {
  const { withPerformanceTrace, logAnalyticsEvent, logHandledError } =
    useObservabilityViewModel();
  const { t } = useTranslation();
  const { currentProducts, setCurrentProducts, productIds, setCurrency } =
    useContext(GlobalProductsContext);
  const { currentUser } = useContext(GlobalUserContext);
  const { currentSubscription, setCurrentSubscription } = useContext(
    GlobalSubscriptionContext,
  );
  const [loading, setLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(
    !currentProducts?.length,
  );
  const [appAccountToken, setAppAccountToken] = useState<string>("");
  const appAccountTokenRef = useRef("");
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
    appAccountToken?: string;
    originalTransactionId?: string;
  };

  const rememberAppAccountToken = () => {
    const existingToken = currentSubscription?.appAccountToken?.trim();
    if (existingToken) {
      appAccountTokenRef.current = existingToken;
      setAppAccountToken(existingToken);
      return existingToken;
    }

    const accountToken = Crypto.randomUUID();
    appAccountTokenRef.current = accountToken;
    setAppAccountToken(accountToken);
    return accountToken;
  };

  const updateSubscriptionInFirebase = async ({
    productId,
    purchaseId,
    purchaseToken,
    appAccountToken: nextAppAccountToken,
    originalTransactionId,
  }: updateInsertSuscriptionParams) => {
    try {
      if (!productId || !currentSubscription?.id)
        throw new Error(t("invalid_subscription"));
      if (Platform.OS === "android" && !purchaseToken)
        throw new Error(t("invalid_subscription"));
      const newSubscription = {
        ...currentSubscription,
        status: "active" as "active" | "inactive",
        productId,
        purchaseId,
        purchaseToken,
        appAccountToken:
          nextAppAccountToken ||
          appAccountTokenRef.current ||
          appAccountToken ||
          currentSubscription.appAccountToken,
        ...(originalTransactionId ? { originalTransactionId } : {}),
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
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleAndroidSubscriptionSwitch = async (newSubscriptionId: string) => {
    try {
      setLoading(true);

      const activePurchaseToken = currentSubscription?.purchaseToken;
      if (Platform.OS === "android" && !activePurchaseToken) {
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
              purchaseToken: activePurchaseToken || "",
              replacementMode: 1,
            },
          },
          type: "subs",
        });
      } else if (Platform.OS === "ios") {
        const accountToken = rememberAppAccountToken();

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
    appAccountToken: nextAppAccountToken,
    originalTransactionId,
  }: updateInsertSuscriptionParams) => {
    try {
      if (!productId || !currentUser?.user.email)
        throw new Error(t("invalid_subscription"));
      const resolvedAppAccountToken =
        nextAppAccountToken || appAccountTokenRef.current || appAccountToken;
      if (Platform.OS === "ios" && !resolvedAppAccountToken)
        throw new Error(t("invalid_purchase_token"));
      const newSubscription = {
        userId: currentUser.user.uid,
        productId,
        userName: currentUser.user.displayName ?? currentUser?.user.email,
        userEmail: currentUser.user.email,
        status: "active" as "active" | "inactive",
        platform: Platform.OS,
        purchaseId,
        purchaseToken,
        appAccountToken: resolvedAppAccountToken,
        ...(originalTransactionId ? { originalTransactionId } : {}),
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
        newSubscription.originalTransactionId,
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
      throw error;
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

      if (validationResult?.isValid) {
        const subscriptionData = buildSubscriptionData(
          purchase,
          validationResult.decodedTransaction,
          appAccountTokenRef.current,
        );

        if (currentSubscription?.id) {
          await updateSubscriptionInFirebase(subscriptionData);
        } else {
          await insertSubscriptionInFirebase(subscriptionData);
        }

        await finishTransaction({
          purchase,
        });

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
          const accountToken = rememberAppAccountToken();

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

  const storeProducts = useMemo(
    () => (subscriptions?.length ? mapStoreSubscriptions(subscriptions) : null),
    [subscriptions],
  );
  const visibleProducts = storeProducts ?? currentProducts;

  useEffect(() => {
    if (!storeProducts?.length) return;

    setCurrentProducts(storeProducts);
    if (storeProducts[0]?.currency) setCurrency(storeProducts[0].currency);
  }, [storeProducts]);

  useEffect(() => {
    if (!connected) return;

    let active = true;
    if (!visibleProducts?.length) setProductsLoading(true);

    void withPerformanceTrace(
      "iap_fetch_products",
      () =>
        fetchProducts({
          skus: productIds,
          type: "subs",
        }),
      { source: "subscriptions" },
    ).finally(() => {
      if (active) setProductsLoading(false);
    });

    return () => {
      active = false;
    };
  }, [connected]);

  return {
    currentProducts: visibleProducts,
    loading: loading || (productsLoading && !visibleProducts?.length),
    currentSubscription,
    handlePurchaseSubscription,
    handleAndroidSubscriptionSwitch,
    subscriptionManageWarning,
  };
};
