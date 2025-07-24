import { Text } from "react-native";
import { useState } from "react";
import { getProductsFromStripe } from "@/src/services/stripe/products";
import { useEffect } from "react";
import { ProductEntity } from "../model/product";

export const SubscriptionsView = () => {
  const [products, setProducts] = useState<ProductEntity[] | []>([]);
  const fetchProducts = async () => {
    try {
      const response = await getProductsFromStripe();
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return products.map((item) => {
    return <Text key={item.priceId}>{item.name}</Text>;
  });
};
