import { ReactNode } from "react";
import UserContextProvider from "@/src/context/userContext";
import ListContextProvider from "@/src/context/listContext";
import { StripeProvider } from "@stripe/stripe-react-native";
import SubscriptionContextProvider from "./subscriptionContext";
import Constants from "expo-constants";

const MainContextProvider = ({ children }: { children: ReactNode }) => {
  const stripePublishableKey = __DEV__
    ? Constants?.expoConfig?.extra?.stripeApiPublicKeyTest
    : Constants?.expoConfig?.extra?.stripeApiPublicKeyProd ?? "";
  return (
    <UserContextProvider>
      <SubscriptionContextProvider>
        <StripeProvider
          publishableKey={stripePublishableKey}
          merchantIdentifier="merchant.identifier" // required for Apple Pay
          urlScheme="your-url-scheme"
        >
          <ListContextProvider>{children}</ListContextProvider>
        </StripeProvider>
      </SubscriptionContextProvider>
    </UserContextProvider>
  );
};

export default MainContextProvider;
