import { useState, useContext } from "react";
import { GlobalUserContext } from "@/src/context/userContext";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { loginUser, loginAnonymously } from "@/src/services/firebase/auth";
import { useTranslation } from "react-i18next";
import {
  logAnalyticsEvent,
  logHandledError,
} from "@/src/services/observability";

export const useSignInViewModel = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { setCurrentUser } = useContext(GlobalUserContext);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);

    try {
      const response = await loginUser(email, password);
      setCurrentUser(response);
      await logAnalyticsEvent("login", { method: "email" });

      router.push("/lists");
    } catch (error: any) {
      await logHandledError("login", error, { method: "email" });
      Alert.alert(t("something_wrong"), `${t(error.message)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousSignIn = async () => {
    setLoading(true);

    try {
      const response = await loginAnonymously();
      setCurrentUser(response);
      await logAnalyticsEvent("anonymous_login", { method: "anonymous" });

      router.push("/lists");
    } catch (error: any) {
      await logHandledError("anonymous_login", error, {
        method: "anonymous",
      });
      Alert.alert(t("something_wrong"), t(error.message));
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSignIn,
    handleAnonymousSignIn,
  };
};
