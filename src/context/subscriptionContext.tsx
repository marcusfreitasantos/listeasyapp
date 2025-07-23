import { createContext, useState, ReactNode, FC } from "react";
import {
  SubscriptionContextType,
  SubscriptionEntityType,
} from "../features/subscriptions/model/subscriber";

export const GlobalSubscriptionContext = createContext<SubscriptionContextType>(
  {
    currentSubscription: null,
    setCurrentSubscription: () => {},
  }
);

const SubscriptionContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentSubscription, setCurrentSubscription] =
    useState<SubscriptionEntityType | null>(null);

  return (
    <GlobalSubscriptionContext.Provider
      value={{ currentSubscription, setCurrentSubscription }}
    >
      {children}
    </GlobalSubscriptionContext.Provider>
  );
};

export default SubscriptionContextProvider;
