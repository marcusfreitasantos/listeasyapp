export type ListItemType = {
  title: string;
  price: number;
  quantity: number;
};

export type ListEntityType = {
  id: string;
  title: string;
  creationDate: number;
  totalPrice: number;
  items: ListItem[];
  authorId: string;
};
