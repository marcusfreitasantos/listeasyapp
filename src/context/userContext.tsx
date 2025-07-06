import { createContext, useState, ReactNode, FC } from "react";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { UserEntity, UserContextType } from "../features/auth/model/user";

export const GlobalUserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.UserCredential | null>(
    null
  );

  return (
    <GlobalUserContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalUserContext.Provider>
  );
};

export default UserContextProvider;
