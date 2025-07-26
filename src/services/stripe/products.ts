const getProductsUrl = __DEV__
  ? `${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/getProducts`
  : "https://getproducts-ttyxjwblsa-uc.a.run.app";

export const getProductsFromStripe = async () => {
  const response = await fetch(getProductsUrl);
  return response.json();
};
