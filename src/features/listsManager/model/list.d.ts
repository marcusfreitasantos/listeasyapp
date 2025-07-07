type ListItem = {
  title: string;
  price: number;
  quantity: number;
};

type ListEntity = {
  id?: string;
  title: string;
  creationDate: string;
  totalPrice: number;
  items: ListItem[];
  author: {
    id: string;
    name: string;
    email: string;
  };
};
