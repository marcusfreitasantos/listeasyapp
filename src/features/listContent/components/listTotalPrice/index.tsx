import * as S from "./styles";
import { centsToReais } from "@/src/utils/convertCurrency";
import { useTranslation } from "react-i18next";

type ListTotalPriceProps = {
  totalPrice: number;
  totalItems: number;
};

export const ListTotalPrice = ({
  totalPrice,
  totalItems,
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
        Total: {centsToReais(totalPrice).toFixed(2)}
      </S.ListTotalPriceText>
    </S.ListTotalPriceWrapper>
  );
};
