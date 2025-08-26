import { Linking, Alert } from "react-native";

export const sendSupportEmail = async () => {
  const recipient = "contato@mafreitas.com.br";
  const subject = "[List Easy] Preciso de ajuda!";
  const url = `mailto:${recipient}?subject=${subject}`;
  try {
    const isSuported = await Linking.canOpenURL(url);
    if (isSuported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Oops!", "Não foi possível abrir o e-mail.");
    }
  } catch (error) {
    Alert.alert(
      "Oops!",
      `Algo errado aconteceu. Tente novamente mais tarde. Erro: ${error}`
    );
  }
};
