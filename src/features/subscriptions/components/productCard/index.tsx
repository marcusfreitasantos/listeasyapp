import * as S from "./styles";
import { ProductEntity } from "../../model/product";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";
import { Button } from "@/src/components/button";
import { SubscriptionEntity } from "../../model/subscription";
import { useTranslation } from "react-i18next";
import { formatPriceWithCurrency } from "@/src/utils/formatPriceWithCurrency";
import { Platform } from "react-native";

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

  const setCurrentPlatform = () => {
    if (Platform.OS === "android") {
      return "Play Store";
    } else if (Platform.OS === "ios") {
      return "App Store";
    } else {
      return t("unknown_platform");
    }
  };

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
        {formatPriceWithCurrency(productData.amount, productData.currency)} /{" "}
        {t(productData.interval)}
      </S.ProductPrice>

      <S.ProductPriceTopicsGroup>
        <S.ProductDescription>- {t("renew_every_month")}</S.ProductDescription>

        <S.ProductDescription>
          - {t("optional_subscription")}
        </S.ProductDescription>

        <S.ProductDescription>
          -{" "}
          {t("cancel_anytime", {
            platform: setCurrentPlatform(),
          })}
        </S.ProductDescription>
      </S.ProductPriceTopicsGroup>

      <Button
        btnText={isCurrentPlan ? t("cancel") : t("subscribe")}
        onPress={() => handleSubscription(productData.productId)}
      />

      <S.ProductDescription>
        {t("payment_through_platform", {
          platform: setCurrentPlatform(),
        })}
      </S.ProductDescription>
    </S.ProductCard>
  );
};
