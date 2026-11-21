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

export type AppStoreDecodedTransaction = {
  bundleId?: string;
  productId?: string;
  transactionId?: string;
  originalTransactionId?: string;
  appAccountToken?: string;
  environment?: string;
};

export type AppStoreValidationResult = {
  isValid: boolean;
  validationSource?: string;
  transactionId?: string;
  decodedTransaction?: AppStoreDecodedTransaction;
  purchaseData?: string;
  message?: string;
};

export const validatePurchaseFromAppStore = async (
  purchaseToken: string,
): Promise<AppStoreValidationResult> => {
  try {
    const validPurchase = await axios.post<AppStoreValidationResult>(
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
