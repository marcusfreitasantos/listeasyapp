const createCustomerUrl = __DEV__
  ? `${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/createStripeCustomer`
  : "https://createstripecustomer-ttyxjwblsa-uc.a.run.app";

export const createCustomerOnStripe = async (email: string, name: string) => {
  const response = await fetch(createCustomerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      name,
    }),
  });
  return response.json();
};
