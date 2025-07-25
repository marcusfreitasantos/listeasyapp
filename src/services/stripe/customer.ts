const localApiBaseUrl = "http://10.0.2.2:5001/list-easy-41446/us-central1";

export const createCustomerOnStripe = async (email: string, name: string) => {
  const response = await fetch(`${localApiBaseUrl}/createStripeCustomer`, {
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
