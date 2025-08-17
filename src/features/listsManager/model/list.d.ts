import { InvitedUserentity } from "../../sharedLists/model/invitedUser";

export type ListItemType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  details: string;
  checked?: boolean;
};

export type ListEntityType = {
  id?: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  totalPrice: number;
  items: ListItem[];
  authorId: string;
  colaborators?: InvitedUserentity[];
};
