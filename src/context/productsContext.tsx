import { createContext, useState, ReactNode, FC } from "react";
import {
  ProductsContextType,
  ProductEntity,
} from "../features/subscriptions/model/product";

export const GlobalProductsContext = createContext<ProductsContextType>({
  currentProducts: null,
  setCurrentProducts: () => null,
  currency: "",
});

const ProductsContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentProducts, setCurrentProducts] = useState<
    ProductEntity[] | null
  >(null);

  const currency = currentProducts ? currentProducts[0]?.currency : "";

  return (
    <GlobalProductsContext.Provider
      value={{ currentProducts, setCurrentProducts, currency }}
    >
      {children}
    </GlobalProductsContext.Provider>
  );
};

export default ProductsContextProvider;
