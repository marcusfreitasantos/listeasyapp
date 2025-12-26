import { useState } from "react";
import {
  registerUser,
  registerAnonymousUser,
} from "@/src/services/firebase/auth";
import { Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export const useSignUpViewModel = () => {
  const { isAnonymous } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setLoading(true);

    try {
      let registeredUser: FirebaseAuthTypes.UserCredential | null;

      if (isAnonymous) {
        registeredUser = await registerAnonymousUser(
          email,
          password,
          displayName
        );
      } else {
        registeredUser = await registerUser(email, password, displayName);
      }

      if (!registeredUser?.user.uid) {
        throw new Error("Não foi possível criar a conta.");
      }
      Alert.alert("Maravilha!", "Sua conta foi criada com sucesso.", [
        {
          text: "Fazer login",
          onPress: () => router.push("/"),
        },
      ]);
    } catch (error: any) {
      Alert.alert("Oops! Algo deu errado:", `${error}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSignUp,
    isAnonymous,
  };
};
