import * as Network from "expo-network";
import { Alert } from "react-native";
import { reloadAsync } from "expo-updates";

export const checkInternetConnection = async () => {
  const networkState = await Network.getNetworkStateAsync();

  if (!networkState.isConnected) {
    Alert.alert(
      "Sem conexão com a internet",
      "Por favor, verifique sua conexão com a internet e tente novamente.",
      [
        {
          text: "OK",
          onPress: () => reloadAsync(),
        },
      ],
    );
    return;
  }
};
