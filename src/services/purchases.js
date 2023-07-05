import Purchases from "react-native-purchases";

export const getProductsFromTheStore = async () => {
  try {
    const offerings = await Purchases.getOfferings();
    if (offerings.current !== null) {
      return offerings.current.availablePackages;
    }
  } catch (error) {
    throw error;
  }
};

export const purchaseProduct = async (productPackage) => {
  try {
    const purchaseMade = await Purchases.purchasePackage(productPackage);

    if (
      typeof purchaseMade.customerInfo.entitlements.active["premium"] !==
      "undefined"
    ) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

export const checkUserSubscriptionStatus = async () => {
  try {
    const customerInfo = await Purchases.getCustomerInfo();

    if (typeof customerInfo.entitlements.active["premium"] !== "undefined") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};
