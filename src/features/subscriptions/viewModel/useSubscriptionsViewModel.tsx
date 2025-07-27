import { Alert } from "react-native";
import { useState } from "react";
import { getProductsFromStripe } from "@/src/services/stripe/products";
import { useEffect, useContext } from "react";
import { ProductEntity } from "../model/product";
import { GlobalSubscriptionContext } from "@/src/context/subscriptionContext";
import { useStripe } from "@stripe/stripe-react-native";
import {
  createNewSubscription,
  getClientSecret,
  setDefaultPaymentMethod,
} from "@/src/services/stripe/subscriptions";
import { updateSubscription } from "@/src/services/firebase/subscriptions";

export const useSubscriptionsViewModel = () => {
  const [products, setProducts] = useState<ProductEntity[] | []>([]);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
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
        stripeSubscriptionStatus: "active",
      };

      await updateSubscription(updatedSubscription);
      setCurrentSubscription(updatedSubscription);
    } catch (error) {
      console.log(error);
    }
  };

  const setup = async (clientSecret: string) => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "List Easy",
      setupIntentClientSecret: clientSecret,
    });
    if (error) {
      console.log("Error on setup", error);
    }
  };

  const fetchClientSecret = async (stripeCustomerId: string) => {
    try {
      const response = await getClientSecret(stripeCustomerId);
      return response.clientSecret;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubscription = async (priceId: string) => {
    setLoading(true);
    try {
      if (!currentSubscription || !currentSubscription.stripeCustomerId)
        throw new Error("Stripe Customer ID is required.");

      const clientSecret = await fetchClientSecret(
        currentSubscription.stripeCustomerId
      );

      if (clientSecret) {
        await setup(clientSecret);
      }

      const { error } = await presentPaymentSheet();

      if (error) {
        throw new Error(error.message);
      } else {
        const defaultPaymentMethod = await setDefaultPaymentMethod(
          currentSubscription.stripeCustomerId
        );

        if (defaultPaymentMethod.defaultPaymentMethod) {
          const response = await createNewSubscription(
            currentSubscription.stripeCustomerId,
            priceId
          );

          if (response.subscriptionId) {
            await updateSubscriptionInFirebase(priceId);
            Alert.alert("Maravilha!", "Seu plano foi contratado com sucesso.");
          } else {
            throw new Error("Error on subscription creation.");
          }
        } else {
          throw new Error("No default payment method.");
        }
      }
    } catch (error) {
      Alert.alert("Oops!", "Não foi possível processar o pagamento!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProductsFromStripe();
        if (isMounted) setProducts(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    products,
    handleSubscription,
    loading,
    currentSubscription,
  };
};
