import { ReactNode } from "react";
import UserContextProvider from "@/src/context/userContext";
import ListContextProvider from "@/src/context/listContext";
import SubscriptionContextProvider from "@/src/context/subscriptionContext";

const MainContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserContextProvider>
      <SubscriptionContextProvider>
        <ListContextProvider>{children}</ListContextProvider>
      </SubscriptionContextProvider>
    </UserContextProvider>
  );
};

export default MainContextProvider;
