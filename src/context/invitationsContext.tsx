import { createContext, useState, ReactNode, FC } from "react";

import {
  InviteEntity,
  InvitationsContextType,
} from "../features/invitation/model/invite";

export const GlobalInvitationsContext = createContext<InvitationsContextType>({
  currentUserInvites: [],
  setCurrentUserInvites: () => [],
});

const InvitationsContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUserInvites, setCurrentUserInvites] = useState<
    InviteEntity[] | []
  >([]);

  return (
    <GlobalInvitationsContext.Provider
      value={{ currentUserInvites, setCurrentUserInvites }}
    >
      {children}
    </GlobalInvitationsContext.Provider>
  );
};

export default InvitationsContextProvider;
