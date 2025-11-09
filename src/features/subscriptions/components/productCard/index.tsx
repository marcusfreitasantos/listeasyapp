import * as S from "./styles";
import { ProductEntity } from "../../model/product";
import { centsToReais } from "@/src/utils/convertCurrency";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";
import { Button } from "@/src/components/button";
import { SubscriptionEntity } from "../../model/subscription";

type ProductCardProps = {
  productData: ProductEntity;
  currentSubscription?: SubscriptionEntity | null;
  handleSubscription: (subscriptionId: string) => void;
};

export const ProductCard = ({
  productData,
  handleSubscription,
  currentSubscription,
}: ProductCardProps) => {
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.medium.replace("px", ""));
  const isCurrentPlan =
    currentSubscription?.status === "active" &&
    currentSubscription?.productId === productData.productId;

  return (
    <S.ProductCard>
      <S.ProductHeader>
        <S.ProductHeaderGroup>
          <Feather color={theme.primaryColor} name="award" size={iconSize} />
          <S.ProductTitle>{productData.name}</S.ProductTitle>
        </S.ProductHeaderGroup>

        {isCurrentPlan && (
          <S.CurrentProductWrapper>
            <S.CurrentProduct>Atual</S.CurrentProduct>
          </S.CurrentProductWrapper>
        )}
      </S.ProductHeader>

      <S.Divisor />

      <S.ProductDescription>{productData.description}</S.ProductDescription>

      <S.Divisor />

      <S.ProductPrice>
        R${centsToReais(productData.amount).toFixed(2)}
      </S.ProductPrice>

      <Button
        btnText={isCurrentPlan ? "Cancelar" : "Assinar"}
        btnType={isCurrentPlan ? "dark" : "light"}
        onPress={() => handleSubscription(productData.productId)}
      />
    </S.ProductCard>
  );
};
