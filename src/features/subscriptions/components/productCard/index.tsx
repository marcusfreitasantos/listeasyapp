import * as S from "./styles";
import { ProductEntity } from "../../model/product";
import { centsToReais } from "@/src/utils/convertCurrency";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";
import { Button } from "@/src/components/button";

type ProductCardProps = {
  productData: ProductEntity;
  onPress: (priceId: string) => void;
  currentUserPlan?: string;
};

export const ProductCard = ({
  productData,
  onPress,
  currentUserPlan,
}: ProductCardProps) => {
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.medium.replace("px", ""));
  const isCurrentPlan = currentUserPlan === productData.priceId;

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
        onPress={() => onPress(productData.priceId)}
      />
    </S.ProductCard>
  );
};
