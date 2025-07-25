import { FirebaseAuthTypes } from "@react-native-firebase/auth";

type UserEntityType = {
  stripeCustomerId?: string;
  stripeSubscriptionStatus?: string;
} & FirebaseAuthTypes.UserCredential;

type UserContextType = {
  currentUser: UserEntityType | null;
  setCurrentUser: (user: UserEntityType | null) => void;
};

export { UserEntityType, UserContextType };
