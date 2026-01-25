import * as S from "./styles";
import { ProductEntity } from "../../model/product";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";
import { Button } from "@/src/components/button";
import { SubscriptionEntity } from "../../model/subscription";
import { useTranslation } from "react-i18next";
import { formatPriceWithCurrency } from "@/src/utils/formatPriceWithCurrency";

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
  const { t } = useTranslation();
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
            <S.CurrentProduct>{t("current")}</S.CurrentProduct>
          </S.CurrentProductWrapper>
        )}
      </S.ProductHeader>

      <S.Divisor />

      <S.ProductDescription>{productData.description}</S.ProductDescription>

      <S.Divisor />

      <S.ProductPrice>
        {formatPriceWithCurrency(productData.amount, productData.currency)}
      </S.ProductPrice>

      <Button
        btnText={isCurrentPlan ? t("cancel") : t("subscribe")}
        btnType="dark"
        onPress={() => handleSubscription(productData.productId)}
      />
    </S.ProductCard>
  );
};
