import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { resetUserPassword } from "@/src/services/firebase/auth";
import { useTranslation } from "react-i18next";
import {
  logAnalyticsEvent,
  logHandledError,
} from "@/src/services/observability";

export const useResetPasswordViewModel = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (email: string) => {
    setLoading(true);

    try {
      await resetUserPassword(email);
      await logAnalyticsEvent("password_reset_requested", {
        source_screen: "reset_password",
      });
      Alert.alert(t("success"), t("password_reset_email_sent"), [
        {
          text: t("confirm"),
        },
      ]);
    } catch (error: any) {
      await logHandledError("password_reset", error);
      Alert.alert(t("something_wrong"), `${error}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handlePasswordReset,
  };
};
