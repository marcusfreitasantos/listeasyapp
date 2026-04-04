import { createContext, useState, ReactNode, FC } from "react";
import {
  ProductsContextType,
  ProductEntity,
} from "../features/subscriptions/model/product";

const productsFallback: ProductEntity[] = [
  {
    amount: 799,
    currency: "BRL",
    description:
      "Ideal for those who want more focus on their lists, without interruptions.",
    interval: "month",
    name: "Essential",
    productId: "plan_essencial",
  },
];

export const GlobalProductsContext = createContext<ProductsContextType>({
  currentProducts: null,
  setCurrentProducts: () => null,
  currency: null,
  setCurrency: () => null,
  productIds: [""],
});

const ProductsContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentProducts, setCurrentProducts] = useState<
    ProductEntity[] | null
  >(productsFallback);

  const [currency, setCurrency] = useState<string | null>("BRL");

  const productIds = ["plan_essencial"];

  return (
    <GlobalProductsContext.Provider
      value={{
        currentProducts,
        setCurrentProducts,
        currency,
        setCurrency,
        productIds,
      }}
    >
      {children}
    </GlobalProductsContext.Provider>
  );
};

export default ProductsContextProvider;
