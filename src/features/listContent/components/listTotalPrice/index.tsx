import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { formatPriceWithCurrency } from "@/src/utils/formatPriceWithCurrency";

type ListTotalPriceProps = {
  totalPrice: number;
  totalItems: number;
  currency: string;
};

export const ListTotalPrice = ({
  totalPrice,
  totalItems,
  currency,
}: ListTotalPriceProps) => {
  const { t } = useTranslation();

  return (
    <S.ListTotalPriceWrapper>
      {totalItems ? (
        <S.ListTotalItemsText>
          {totalItems} {totalItems > 1 ? t("item_plural") : t("item")}
        </S.ListTotalItemsText>
      ) : null}
      <S.ListTotalPriceText>
        Total: {formatPriceWithCurrency(totalPrice, currency)}
      </S.ListTotalPriceText>
    </S.ListTotalPriceWrapper>
  );
};
