import axios from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";

const devBaseUrl =
  Platform.OS === "android" ? "http://10.0.2.2:5001" : "http://127.0.0.1:5001";

const listEasyApiKey = Constants.expoConfig?.extra?.listEasyApiKey ?? null;

export const getUserByEmail = async (email: string) => {
  if (!listEasyApiKey) {
    throw new Error("No API key found");
  }

  try {
    const getUserByEmailUrl =
      "https://getuserbyemailinfirebaseauth-ttyxjwblsa-uc.a.run.app";

    const response = await axios.get(getUserByEmailUrl, {
      params: { user_email: email },
      headers: {
        "x-api-key": listEasyApiKey,
      },
    });

    return response.data;
  } catch {
    throw new Error("services.firebase_auth.user_fetch_error");
  }
};

export const deleteUserData = async (userId: string, purchaseToken: string) => {
  try {
    const deleteUserDataUrl = "https://deleteuserdata-ttyxjwblsa-uc.a.run.app";

    if (!listEasyApiKey) {
      throw new Error("No API key found");
    }

    const response = await axios.post(
      deleteUserDataUrl,
      {
        userId,
        purchaseToken,
      },
      {
        headers: {
          "x-api-key": listEasyApiKey,
        },
      },
    );

    return response;
  } catch (error) {
    throw new Error(`Error deleting user data: ${error}`);
  }
};
