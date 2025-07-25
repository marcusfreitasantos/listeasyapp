import { useState } from "react";
import { registerUser } from "@/src/services/firebase/auth";
import { Alert } from "react-native";
import { router } from "expo-router";
import { createCustomerOnStripe } from "@/src/services/stripe/customer";
import { insertNewSubscriber } from "@/src/services/firebase/subscriptions";

export const useSignUpViewModel = () => {
  const [loading, setLoading] = useState(false);

  const handleStripeCustomerCreation = async (
    userEmail: string,
    userName: string
  ) => {
    try {
      const stripeCustomer = await createCustomerOnStripe(userEmail, userName);
      return stripeCustomer;
    } catch (error: any) {
      throw new Error(`Error creating Stripe customer: ${error.message}`);
    }
  };

  const handleInsertNewSubscriber = async (
    userId: string,
    stripeCustomerId: string
  ) => {
    try {
      const newSubscriber = await insertNewSubscriber(userId, stripeCustomerId);
      return newSubscriber;
    } catch (error: any) {
      throw new Error(`Error inserting new subscriber: ${error.message}`);
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setLoading(true);

    try {
      const registeredUser = await registerUser(email, password, displayName);

      if (registeredUser.user.uid) {
        const newStripeCustomer = await handleStripeCustomerCreation(
          email,
          displayName
        );

        if (newStripeCustomer.stripeCustomerId) {
          await handleInsertNewSubscriber(
            registeredUser.user.uid,
            newStripeCustomer.stripeCustomerId
          );
        }
      }

      Alert.alert("Maravilha!", "Sua conta foi criada com sucesso.", [
        {
          text: "Fazer login",
          onPress: () => router.push("/"),
        },
      ]);
    } catch (error: any) {
      console.log("useSignUpViewModel", error);
      Alert.alert("Oops! Algo deu errado:", `${error}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSignUp,
  };
};
