import { useState } from "react";
import { Alert } from "react-native";
import { resetUserPassword } from "@/src/services/firebase/auth";
import { useTranslation } from "react-i18next";
import { useObservabilityViewModel } from "@/src/features/observability/viewModel/useObservabilityViewModel";

export const useResetPasswordViewModel = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { logAnalyticsEvent, logHandledError } = useObservabilityViewModel();

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
