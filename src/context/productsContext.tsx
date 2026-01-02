import { createContext, useState, ReactNode, FC } from "react";
import {
  ProductsContextType,
  ProductEntity,
} from "../features/subscriptions/model/product";

export const GlobalProductsContext = createContext<ProductsContextType>({
  currentProducts: null,
  setCurrentProducts: () => null,
  currency: "",
  productIds: [""],
});

const ProductsContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentProducts, setCurrentProducts] = useState<
    ProductEntity[] | null
  >(null);

  const currency = currentProducts ? currentProducts[0]?.currency : "";

  const productIds = ["plan_essencial", "plan_premium", "plan_premium_annual"];

  return (
    <GlobalProductsContext.Provider
      value={{ currentProducts, setCurrentProducts, currency, productIds }}
    >
      {children}
    </GlobalProductsContext.Provider>
  );
};

export default ProductsContextProvider;
