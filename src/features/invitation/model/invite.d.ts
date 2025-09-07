export type InviteEntity = {
  id?: string;
  userEmail: string;
  referralUsername: string;
  referralUserId: string;
  list: {
    id: string;
    name: string;
  };
  status: "pending" | "accepted" | "declined";
  createdAt?: string;
  updatedAt?: string;
};

export type InvitationsContextType = {
  currentUserInvites: InviteEntity[] | [];
  setCurrentUserInvites: (invites: InviteEntity[]) => void;
};
