import axios from "axios";

const validatePurchaseUrl = __DEV__
  ? "http://10.0.2.2:5001/list-easy-41446/us-central1/validatePurchaseTokenFromGooglePlay"
  : "https://validatepurchasetokenfromgoogleplay-ttyxjwblsa-uc.a.run.app";

export const validatePurchaseToken = async (purchaseToken: string) => {
  try {
    const validPurchase = await axios.post(validatePurchaseUrl, {
      purchaseToken,
    });

    return validPurchase.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error validating purchase token: ${error}`);
  }
};
