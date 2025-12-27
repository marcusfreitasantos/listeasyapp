import { useState } from "react";
import {
  registerUser,
  registerAnonymousUser,
} from "@/src/services/firebase/auth";
import { Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useTranslation } from "react-i18next";

export const useSignUpViewModel = () => {
  const { t } = useTranslation();
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
        throw new Error(t("unable_to_create_account"));
      }
      Alert.alert(t("great"), t("account_created"), [
        {
          text: t("login"),
          onPress: () => router.push("/"),
        },
      ]);
    } catch (error: any) {
      Alert.alert(t("something_wrong"), `${error}`);
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
