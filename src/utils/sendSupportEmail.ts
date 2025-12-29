import { Linking, Alert } from "react-native";
import { useTranslation } from "react-i18next";

export const sendSupportEmail = async () => {
  const { t } = useTranslation();
  const recipient = "contato@mafreitas.com.br";
  const subject = t("support_email_subject");
  const url = `mailto:${recipient}?subject=${subject}`;
  try {
    const isSuported = await Linking.canOpenURL(url);
    if (isSuported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(t("Error"), t("email_not_opened"));
    }
  } catch (error) {
    Alert.alert(t("something_wrong"), `${error}`);
  }
};
