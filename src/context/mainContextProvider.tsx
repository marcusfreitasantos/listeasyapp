import { ReactNode } from "react";
import UserContextProvider from "@/src/context/userContext";
import ListContextProvider from "@/src/context/listContext";
import SubscriptionContextProvider from "./subscriptionContext";
import InvitationsContextProvider from "./invitationsContext";

const MainContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserContextProvider>
      <SubscriptionContextProvider>
        <ListContextProvider>
          <InvitationsContextProvider>{children}</InvitationsContextProvider>
        </ListContextProvider>
      </SubscriptionContextProvider>
    </UserContextProvider>
  );
};

export default MainContextProvider;
