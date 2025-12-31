import { Linking, Alert } from "react-native";

export const sendSupportEmail = async (subject: string, alert: string) => {
  const recipient = "contato@mafreitas.com.br";
  const url = `mailto:${recipient}?subject=${subject}`;
  try {
    const isSuported = await Linking.canOpenURL(url);
    if (!isSuported) throw new Error(alert);
    await Linking.openURL(url);
  } catch (error) {
    Alert.alert(`${error}`);
  }
};
