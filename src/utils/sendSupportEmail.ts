import { Linking, Alert } from "react-native";

export const sendSupportEmail = async (subject: string, alert: string) => {
  const recipient = "support@listeasyapp.work.gd";
  const url = `mailto:${recipient}?subject=${subject}`;

  try {
    const isSuported = await Linking.canOpenURL(url);
    if (!isSuported) throw new Error(alert);
    await Linking.openURL(url);
  } catch (error) {
    Alert.alert(`${error}`);
  }
};
