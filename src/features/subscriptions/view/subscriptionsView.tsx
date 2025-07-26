import { Alert, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { getProductsFromStripe } from "@/src/services/stripe/products";
import { useEffect, useContext } from "react";
import { ProductEntity } from "../model/product";
import { GlobalUserContext } from "@/src/context/userContext";
import { LoadingSpinner } from "@/src/components/loadingSpinner";
import { useStripe } from "@stripe/stripe-react-native";
import {
  createNewSubscription,
  getClientSecret,
  setDefaultPaymentMethod,
} from "@/src/services/stripe/subscriptions";

export const SubscriptionsView = () => {
  const [products, setProducts] = useState<ProductEntity[] | []>([]);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { currentUser } = useContext(GlobalUserContext);
  const [clientSecret, setClientSecret] = useState("");

  if (!currentUser) return null;

  const fetchClientSecret = async () => {
    try {
      if (!currentUser.stripeCustomerId)
        throw new Error("Stripe Customer ID is required.");
      const response = await getClientSecret(currentUser.stripeCustomerId);
      if (response.clientSecret) setClientSecret(response.clientSecret);
    } catch (error) {
      console.log(error);
    }
  };

  const setup = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "List Easy",
      setupIntentClientSecret: clientSecret,
    });
    if (error) {
      console.log("Error on setup", error);
    }
  };

  const handleSubscription = async (priceId: string) => {
    try {
      if (!currentUser || !currentUser.stripeCustomerId) return;
      const { error } = await presentPaymentSheet();

      if (error) {
        throw new Error(error.message);
      } else {
        const defaultPaymentMethod = await setDefaultPaymentMethod(
          currentUser.stripeCustomerId
        );

        if (defaultPaymentMethod.defaultPaymentMethod) {
          const response = await createNewSubscription(
            currentUser.stripeCustomerId,
            priceId
          );

          if (response.subscriptionId) {
            Alert.alert("Deu bom!", "Assinatura contratada com sucesso.");
          } else {
            throw new Error("Não foi possível processar o pagamento!");
          }
        } else {
          throw new Error("Não foi possível processar o pagamento!");
        }
      }
    } catch (error) {
      Alert.alert("Deu ruim!", "Nenhuma forma de pagamento encontrada.");
      console.log(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        const response = await getProductsFromStripe();
        if (isMounted) setProducts(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (products.length) fetchClientSecret();
  }, [products]);

  useEffect(() => {
    console.log(clientSecret);
    if (clientSecret && clientSecret !== "") setup();
  }, [clientSecret]);

  return products.map((item) => {
    return (
      <TouchableOpacity
        key={item.priceId}
        onPress={() => handleSubscription(item.priceId)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  });
};
