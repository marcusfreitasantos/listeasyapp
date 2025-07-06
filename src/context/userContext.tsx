import { createContext, useState, ReactNode, FC } from "react";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { UserContextType } from "../features/auth/model/user";

export const GlobalUserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
});

const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] =
    useState<FirebaseAuthTypes.UserCredential | null>(null);

  return (
    <GlobalUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </GlobalUserContext.Provider>
  );
};

export default UserContextProvider;
