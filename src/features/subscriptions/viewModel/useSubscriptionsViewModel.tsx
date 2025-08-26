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
  cancelSubscription,
  switchUserSubscription,
} from "@/src/services/stripe/subscriptions";
import { updateSubscription } from "@/src/services/firebase/subscriptions";

export const useSubscriptionsViewModel = () => {
  const [products, setProducts] = useState<ProductEntity[] | []>([]);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { currentSubscription, setCurrentSubscription } = useContext(
    GlobalSubscriptionContext
  );
  const [loading, setLoading] = useState(false);

  const updateSubscriptionInFirebase = async (
    productId: string,
    stripeSubscriptionId: string
  ) => {
    try {
      if (!currentSubscription || !currentSubscription.id)
        throw new Error("Invalid Subscription.");
      const updatedSubscription = {
        ...currentSubscription,
        productId,
        stripeSubscriptionStatus: "active",
        stripeSubscriptionId,
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
            await updateSubscriptionInFirebase(
              priceId,
              response.subscriptionId
            );
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

  const handleCancelSubscription = async (stripeSubscriptionId: string) => {
    Alert.alert(
      "Atenção!",
      "Sua assinatura será cancelada. Deseja prosseguir?",
      [
        {
          text: "Voltar",
        },
        {
          text: "Cancelar assinatura",
          onPress: async () => {
            try {
              setLoading(true);
              if (!currentSubscription || !currentSubscription.id)
                throw new Error("Invalid Subscription.");
              const response = await cancelSubscription(stripeSubscriptionId);

              const updatedSubscription = {
                ...currentSubscription,
                stripeSubscriptionStatus: response.subscriptionStatus,
                stripeSubscriptionId,
              };

              await updateSubscription(updatedSubscription);
              setCurrentSubscription(updatedSubscription);

              Alert.alert("Tudo certo!", "Assinatura cancelada com sucesso.");
            } catch (error) {
              Alert.alert("Oops!", "Não foi possível cancelar sua assinatura!");
              console.log(error);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleSwitchSubscription = async (
    stripeSubscriptionId: string,
    priceId: string
  ) => {
    Alert.alert(
      "Atenção!",
      "Sua assinatura atual será migrada para o novo plano. Sua próxima fatura já contemplará o novo valor. Deseja prosseguir?",
      [
        {
          text: "Voltar",
        },
        {
          text: "Alterar assinatura",
          onPress: async () => {
            try {
              setLoading(true);
              if (!currentSubscription || !currentSubscription.id)
                throw new Error("Invalid Subscription.");
              const response = await switchUserSubscription(
                stripeSubscriptionId,
                priceId
              );

              const updatedSubscription = {
                ...currentSubscription,
                stripeSubscriptionStatus: response.subscriptionStatus,
                stripeSubscriptionId,
              };

              await updateSubscription(updatedSubscription);
              setCurrentSubscription(updatedSubscription);
            } catch (error) {
              Alert.alert("Oops!", "Não foi possível alterar sua assinatura!");
              console.log(error);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProductsFromStripe();
        const sortedProducts = response.sort(
          (a: ProductEntity, b: ProductEntity) => {
            return b.amount - a.amount;
          }
        );
        if (isMounted) setProducts(sortedProducts);
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

  const handleSubscriptionOnPress = (
    isCurrentPlan: boolean,
    priceId: string
  ) => {
    if (currentSubscription?.stripeSubscriptionStatus !== "active") {
      return handleSubscription(priceId);
    } else {
      return isCurrentPlan
        ? handleCancelSubscription(
            currentSubscription?.stripeSubscriptionId ?? ""
          )
        : handleSwitchSubscription(
            currentSubscription?.stripeSubscriptionId,
            priceId
          );
    }
  };

  return {
    products,
    handleSubscription,
    loading,
    currentSubscription,
    handleCancelSubscription,
    handleSubscriptionOnPress,
  };
};
