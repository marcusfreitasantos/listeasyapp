type SubscriptionEntity = {
  id?: string;
  productId: string;
  userId: string;
  userName: string;
  userEmail: string;
};

type SubscriptionContextType = {
  currentSubscription: SubscriptionEntity | null;
  setCurrentSubscription: React.Dispatch<
    React.SetStateAction<SubscriptionEntity | null>
  >;
};

export type { SubscriptionEntity, SubscriptionContextType };
