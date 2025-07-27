import { FirebaseAuthTypes } from "@react-native-firebase/auth";

type UserContextType = {
  currentUser: FirebaseAuthTypes.UserCredential | null;
  setCurrentUser: (user: FirebaseAuthTypes.UserCredential | null) => void;
};

export { UserContextType };
