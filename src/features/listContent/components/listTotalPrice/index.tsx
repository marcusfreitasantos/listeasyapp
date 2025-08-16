import * as S from "./styles";
import { centsToReais } from "@/src/utils/convertCurrency";

type ListTotalPriceProps = {
  totalPrice: number;
  totalItems: number;
};

export const ListTotalPrice = ({
  totalPrice,
  totalItems,
}: ListTotalPriceProps) => {
  return (
    <S.ListTotalPriceWrapper>
      {totalItems ? (
        <S.ListTotalItemsText>
          {totalItems} {totalItems > 1 ? "itens únicos" : "item"}
        </S.ListTotalItemsText>
      ) : null}
      <S.ListTotalPriceText>
        Total: R$ {centsToReais(totalPrice).toFixed(2)}
      </S.ListTotalPriceText>
    </S.ListTotalPriceWrapper>
  );
};
