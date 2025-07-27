type SubscriptionEntity = {
  id?: string;
  stripeCustomerId: string;
  stripeSubscriptionStatus: string;
  productId: string;
  userId: string;
  userName: string;
};

type SubscriptionContextType = {
  currentSubscription: SubscriptionEntity | null;
  setCurrentSubscription: React.Dispatch<
    React.SetStateAction<SubscriptionEntity | null>
  >;
};

export type { SubscriptionEntity, SubscriptionContextType };
