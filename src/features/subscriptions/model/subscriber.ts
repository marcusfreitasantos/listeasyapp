type SubscriptionEntityType = {
  id: string;
  current_period_start: number;
  current_period_end: number;
  customer: string;
  isActive: boolean;
  plan: {
    id: string;
    active: true;
    amount: number;
    billing_scheme: string;
    created: number;
    currency: string;
    interval: string;
    interval_count: number;
    nickname: string;
    product: string;
  };
};

type SubscriberType = {
  userId: string;
  subscription: SubscriptionEntityType;
};

type SubscriptionContextType = {
  currentSubscription: SubscriptionEntityType | null;
  setCurrentSubscription: React.Dispatch<
    React.SetStateAction<SubscriptionEntityType | null>
  >;
};

export type { SubscriptionEntityType, SubscriberType, SubscriptionContextType };
