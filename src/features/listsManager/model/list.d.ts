export type ListItemType = {
  title: string;
  price: number;
  quantity: number;
};

export type ListEntityType = {
  id?: string;
  title: string;
  createdAt?: string;
  totalPrice: number;
  items: ListItem[];
  authorId: string;
};
