import { createContext, useState, ReactNode, FC } from "react";
import {
  SubscriptionContextType,
  SubscriptionEntity,
} from "../features/subscriptions/model/subscription";

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
    useState<SubscriptionEntity | null>(null);

  return (
    <GlobalSubscriptionContext.Provider
      value={{ currentSubscription, setCurrentSubscription }}
    >
      {children}
    </GlobalSubscriptionContext.Provider>
  );
};

export default SubscriptionContextProvider;
