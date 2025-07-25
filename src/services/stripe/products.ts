const localApiBaseUrl = "http://10.0.2.2:5001/list-easy-41446/us-central1";
const getProductsApiUrl = "https://getproducts-ttyxjwblsa-uc.a.run.app";
const createStripeCustomerUrl =
  "https://createstripecustomer-ttyxjwblsa-uc.a.run.app";
const createSubscriptionUrl =
  "https://createsubscriptionpaymentsheet-ttyxjwblsa-uc.a.run.app";

export const getProductsFromStripe = async () => {
  const response = await fetch(getProductsApiUrl);
  return response.json();
};
