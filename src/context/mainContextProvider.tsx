import { ReactNode } from "react";
import UserContextProvider from "@/src/context/userContext";
import ListContextProvider from "@/src/context/listContext";
import SubscriptionContextProvider from "./subscriptionContext";
import InvitationsContextProvider from "./invitationsContext";
import ProductsContextProvider from "./productsContext";

const MainContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserContextProvider>
      <ProductsContextProvider>
        <SubscriptionContextProvider>
          <ListContextProvider>
            <InvitationsContextProvider>{children}</InvitationsContextProvider>
          </ListContextProvider>
        </SubscriptionContextProvider>
      </ProductsContextProvider>
    </UserContextProvider>
  );
};

export default MainContextProvider;
