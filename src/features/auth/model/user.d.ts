import { FirebaseAuthTypes } from "@react-native-firebase/auth";

type UserContextType = {
  currentUser: FirebaseAuthTypes.UserCredential | null;
  setCurrentUser: (user: FirebaseAuthTypes.UserCredential) => void;
};

export { UserContextType };
