import { Alert } from "react-native";
import { useState } from "react";
import { useEffect, useContext } from "react";
import { ProductEntity } from "../model/product";
import { GlobalSubscriptionContext } from "@/src/context/subscriptionContext";
import { updateSubscription } from "@/src/services/firebase/subscriptions";

export const useSubscriptionsViewModel = () => {
  const [products, setProducts] = useState<ProductEntity[] | []>([]);
  const { currentSubscription, setCurrentSubscription } = useContext(
    GlobalSubscriptionContext
  );
  const [loading, setLoading] = useState(false);

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

  return {
    products,
    loading,
    currentSubscription,
  };
};
