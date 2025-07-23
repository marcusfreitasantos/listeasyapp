import { createContext, useState, ReactNode, FC } from "react";
import {
  SubscriptionContextType,
  SubscriptionEntityType,
} from "../features/subscriptions/model/subscriber";

const testSubscription: SubscriptionEntityType = {
  id: "sub_1Mow",
  current_period_start: 1682288167,
  current_period_end: 1679609767,
  customer: "cus_Na6",
  isActive: true,
  plan: {
    id: "price_1Mow",
    active: true,
    amount: 499,
    billing_scheme: "per_unit",
    created: 1679609766,
    currency: "brl",
    interval: "month",
    interval_count: 1,
    nickname: "Plano Básico",
    product: "prod_Na6",
  },
};

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
    useState<SubscriptionEntityType | null>(__DEV__ ? testSubscription : null);

  return (
    <GlobalSubscriptionContext.Provider
      value={{ currentSubscription, setCurrentSubscription }}
    >
      {children}
    </GlobalSubscriptionContext.Provider>
  );
};

export default SubscriptionContextProvider;
