export type ListItemType = {
  name: string;
  price: number;
  quantity: number;
};

export type ListEntityType = {
  id?: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  totalPrice: number;
  items: ListItem[];
  authorId: string;
};
