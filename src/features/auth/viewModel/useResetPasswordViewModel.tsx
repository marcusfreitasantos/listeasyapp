import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { resetPassword } from "@/src/services/firebase/auth";
import { useTranslation } from "react-i18next";

export const useResetPasswordViewModel = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (email: string) => {
    setLoading(true);

    try {
      await resetPassword(email);
      Alert.alert(t("success"), t("password_reset_email_sent"), [
        {
          text: t("confirm"),
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
    handlePasswordReset,
  };
};
