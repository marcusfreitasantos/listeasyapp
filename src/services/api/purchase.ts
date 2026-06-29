import axios from "axios";
import { Platform } from "react-native";

const devBaseUrl =
  Platform.OS === "android" ? "http://10.0.2.2:5001" : "http://127.0.0.1:5001";

const validatePurchaseUrlGooglePlay = __DEV__
  ? `${devBaseUrl}/list-easy-41446/us-central1/validatePurchaseTokenFromGooglePlay`
  : "https://validatepurchasetokenfromgoogleplay-ttyxjwblsa-uc.a.run.app";

export const validatePurchaseTokenFromGooglePlay = async (
  purchaseToken: string,
) => {
  try {
    const validPurchase = await axios.post(validatePurchaseUrlGooglePlay, {
      purchaseToken,
    });

    return validPurchase.data;
  } catch (error) {
    throw new Error(`Error validating purchase token: ${error}`);
  }
};

const validatePurchaseUrlAppStore = __DEV__
  ? `${devBaseUrl}/list-easy-41446/us-central1/validatePurchaseFromAppStore`
  : "https://validatePurchaseFromAppStore-ttyxjwblsa-uc.a.run.app";

export const validatePurchaseFromAppStore = async (purchaseToken: string) => {
  try {
    console.log("purchasetoken", purchaseToken);
    const validPurchase = await axios.post(validatePurchaseUrlAppStore, {
      purchaseToken,
    });

    return validPurchase.data;
  } catch (error) {
    throw new Error(`Error validating transaction id: ${error}`);
  }
};
