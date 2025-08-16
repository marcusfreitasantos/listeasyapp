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
      <S.ListTotalItemsText>{totalItems} itens únicos</S.ListTotalItemsText>
      <S.ListTotalPriceText>
        Total: R$ {centsToReais(totalPrice).toFixed(2)}
      </S.ListTotalPriceText>
    </S.ListTotalPriceWrapper>
  );
};
