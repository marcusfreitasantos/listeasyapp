type ProductEntity = {
  productId: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  interval: string;
};

type ProductsContextType = {
  currentProducts: ProductEntity[] | null;
  setCurrentProducts: React.Dispatch<
    React.SetStateAction<ProductEntity[] | null>
  >;
  currency: string;
  productIds: string[];
};

export type { ProductEntity, ProductsContextType };
