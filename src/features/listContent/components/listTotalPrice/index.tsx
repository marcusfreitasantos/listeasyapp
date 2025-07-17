import * as S from "./styles";
import { centsToReais } from "@/src/utils/convertCurrency";

type ListTotalPriceProps = {
  totalPrice: number;
};

export const ListTotalPrice = ({ totalPrice }: ListTotalPriceProps) => {
  return (
    <S.ListTotalPriceWrapper>
      <S.ListTotalPriceText>
        Total: R$ {centsToReais(totalPrice).toFixed(2)}
      </S.ListTotalPriceText>
    </S.ListTotalPriceWrapper>
  );
};
