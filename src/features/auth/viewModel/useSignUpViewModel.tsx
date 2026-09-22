import { useState } from "react";
import {
  registerUser,
  convertAnonymousUser,
} from "@/src/services/firebase/auth";
import { Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useTranslation } from "react-i18next";
import { useObservabilityViewModel } from "@/src/features/observability/viewModel/useObservabilityViewModel";

export const useSignUpViewModel = () => {
  const { t } = useTranslation();
  const { isAnonymous } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const { logAnalyticsEvent, logHandledError } = useObservabilityViewModel();

  const handleSignUp = async (
    email: string,
    password: string,
    displayName: string,
  ) => {
    setLoading(true);

    try {
      let registeredUser: FirebaseAuthTypes.UserCredential["user"] | null;

      if (isAnonymous) {
        registeredUser = await convertAnonymousUser(
          email,
          password,
          displayName,
        );
      } else {
        registeredUser = (await registerUser(email, password, displayName))
          .user;
      }

      if (!registeredUser?.uid) {
        throw new Error(t("unable_to_create_account"));
      }
      await logAnalyticsEvent("sign_up", {
        method: "email",
        converted_from_anonymous: Boolean(isAnonymous),
      });
      Alert.alert(t("great"), t("account_created"), [
        {
          text: t("login"),
          onPress: () => router.push("/"),
        },
      ]);
    } catch (error: any) {
      await logHandledError("sign_up", error, {
        method: "email",
        converted_from_anonymous: Boolean(isAnonymous),
      });
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
