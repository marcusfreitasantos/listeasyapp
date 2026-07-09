import { PlatformOSType } from "react-native";

type SubscriptionEntity = {
  id?: string;
  productId: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: "active" | "inactive";
  platform: PlatformOSType;
  purchaseId: string;
  purchaseToken: string;
  appAccountToken?: string;
};

type SubscriptionContextType = {
  currentSubscription: SubscriptionEntity | null;
  setCurrentSubscription: React.Dispatch<
    React.SetStateAction<SubscriptionEntity | null>
  >;
};

export type { SubscriptionEntity, SubscriptionContextType };
