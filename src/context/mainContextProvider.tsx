import { ReactNode } from "react";
import UserContextProvider from "@/src/context/userContext";
import ListContextProvider from "@/src/context/listContext";
import { StripeProvider } from "@stripe/stripe-react-native";
import Constants from "expo-constants";

const MainContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserContextProvider>
      <StripeProvider
        publishableKey={
          Constants?.expoConfig?.extra?.stripeApiPublicKeyTest ?? ""
        }
        merchantIdentifier="merchant.identifier" // required for Apple Pay
        urlScheme="your-url-scheme"
      >
        <ListContextProvider>{children}</ListContextProvider>
      </StripeProvider>
    </UserContextProvider>
  );
};

export default MainContextProvider;
