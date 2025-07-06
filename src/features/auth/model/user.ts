import { FirebaseAuthTypes } from "@react-native-firebase/auth";

type UserEntity = {
  additionalUserInfo?: { isNewUser: boolean };
  user: {
    displayName: null;
    email: string;
    emailVerified: false;
    isAnonymous: false;
    metadata: [Object];
    multiFactor: [Object];
    phoneNumber: null;
    photoURL: null;
    providerData: [];
    providerId: string;
    tenantId: null;
    uid: string;
  };
};

type UserContextType = {
  user: FirebaseAuthTypes.UserCredential | null;
  setUser: (user: FirebaseAuthTypes.UserCredential) => void;
};

export { UserEntity, UserContextType };
