export type InviteEntity = {
  userEmail: string;
  referralUsername: string;
  list: {
    id: string;
    name: string;
  };
  status: "pending" | "accepted" | "declined";
  createdAt: string;
  updatedAt: string;
};
