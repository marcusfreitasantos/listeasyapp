type SubscriptionEntityType = {
  id: string;
  billing_cycle_anchor: string;
  current_period_start: string;
  current_period_end: string;
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
    nickname: null;
    product: string;
  };
};

type SubscriptionContextType = {
  currentSubscription: SubscriptionEntityType | null;
  setCurrentSubscription: React.Dispatch<
    React.SetStateAction<SubscriptionEntityType | null>
  >;
};

export type { SubscriptionContextType, SubscriptionEntityType };
