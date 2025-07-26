const createSubscriptionUrl = __DEV__
  ? `${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/createSubscriptionPaymentSheet`
  : "https://createsubscriptionpaymentsheet-ttyxjwblsa-uc.a.run.app";

const getClientSecretUrl = __DEV__
  ? `${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/getClientSecret`
  : "https://getclientsecret-ttyxjwblsa-uc.a.run.app";

const setDefaultPaymentMethodUrl = __DEV__
  ? `${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/attachDefaultPaymentMethod`
  : "https://attachDefaultPaymentMethod-ttyxjwblsa-uc.a.run.app";

export const createNewSubscription = async (
  customerId: string,
  priceId: string
) => {
  const response = await fetch(createSubscriptionUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customerId,
      priceId,
    }),
  });
  return response.json();
};

export const getClientSecret = async (customerId: string) => {
  const response = await fetch(getClientSecretUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customerId,
    }),
  });
  return response.json();
};

export const setDefaultPaymentMethod = async (customerId: string) => {
  const response = await fetch(setDefaultPaymentMethodUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customerId,
    }),
  });
  return response.json();
};
