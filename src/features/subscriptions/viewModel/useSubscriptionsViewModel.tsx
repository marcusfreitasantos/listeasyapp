import { Alert } from "react-native";
import { useState } from "react";
import { useEffect, useContext } from "react";
import { ProductEntity } from "../model/product";
import { GlobalSubscriptionContext } from "@/src/context/subscriptionContext";
import { updateSubscription } from "@/src/services/firebase/subscriptions";
import { useIAP } from "expo-iap";
import { reaisToCents } from "@/src/utils/convertCurrency";
import { parseBillingPeriod } from "@/src/utils/parseBillingPeriod";

export const useSubscriptionsViewModel = () => {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const { currentSubscription, setCurrentSubscription } = useContext(
    GlobalSubscriptionContext
  );
  const [loading, setLoading] = useState(false);
  const { connected, fetchProducts, subscriptions } = useIAP();
  const productIds = ["plan_essencial", "plan_premium", "plan_premium_annual"];

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

      setProducts(fetchedProducts.filter((product) => product !== undefined));
    }
  }, [subscriptions]);

  return {
    products,
    loading,
    currentSubscription,
  };
};
