import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";

const listEasyApiKey = Constants.expoConfig?.extra?.listEasyApiKey ?? null;

const devBaseUrl =
  Platform.OS === "android" ? "http://10.0.2.2:5001" : "http://127.0.0.1:5001";

const validatePurchaseUrlGooglePlay =
  "https://validatepurchasetokenfromgoogleplay-ttyxjwblsa-uc.a.run.app";

export const validatePurchaseTokenFromGooglePlay = async (
  purchaseToken: string,
) => {
  try {
    const validPurchase = await axios.post(
      validatePurchaseUrlGooglePlay,
      {
        purchaseToken,
      },
      {
        headers: {
          "x-api-key": listEasyApiKey,
        },
      },
    );

    return validPurchase.data;
  } catch (error) {
    throw new Error(`Error validating purchase token: ${error}`);
  }
};

const validatePurchaseUrlAppStore =
  "https://validatePurchaseFromAppStore-ttyxjwblsa-uc.a.run.app";

export const validatePurchaseFromAppStore = async (purchaseToken: string) => {
  try {
    const validPurchase = await axios.post(
      validatePurchaseUrlAppStore,
      {
        purchaseToken,
      },
      {
        headers: {
          "x-api-key": listEasyApiKey,
        },
      },
    );

    return validPurchase.data;
  } catch (error) {
    throw new Error(`Error validating transaction id: ${error}`);
  }
};
