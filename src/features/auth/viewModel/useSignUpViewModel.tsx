import { useState } from "react";
import { registerUser } from "@/src/services/firebase/auth";
import { Alert } from "react-native";
import { router } from "expo-router";

export const useSignUpViewModel = () => {
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    setLoading(true);

    try {
      const response = await registerUser(
        email,
        password,
        `${firstName} ${lastName}`
      );
      console.log(response);
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
