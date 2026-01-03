import { useState } from "react";
import * as S from "./styles";
import { ListEntityType } from "../../model/list";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";
import { ListMenu } from "../listMenu";
import { formatPriceWithCurrency } from "@/src/utils/formatPriceWithCurrency";
import { ListMenuProps } from "../listMenu";

type ListCardProps = {
  list: ListEntityType;
  currency: string;
  isColaborator: boolean;
  totalPriceText: string;
  listCardSubtitle: string;
  listMenuOptions: (list: ListEntityType) => ListMenuProps["options"];
  handleEditList: (list: ListEntityType) => void;
};

export const ListCard = ({
  list,
  currency,
  isColaborator,
  totalPriceText,
  listCardSubtitle,
  listMenuOptions,
  handleEditList,
}: ListCardProps) => {
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.large.replace("px", ""));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <S.ListCardWrapper
      onPress={() => handleEditList(list)}
      isColaborator={isColaborator}
    >
      <S.ListCardHeader>
        <S.ListCardTitle numberOfLines={1}>{list.title}</S.ListCardTitle>

        {isColaborator && (
          <S.ListCardSubTitle>[{listCardSubtitle}]</S.ListCardSubTitle>
        )}

        <S.ListCardMenuBtn onPress={() => setIsMenuOpen(!isMenuOpen)}>
          <Feather
            size={iconSize}
            color={theme.primaryColor}
            name={isMenuOpen ? "x" : "menu"}
          />
        </S.ListCardMenuBtn>
      </S.ListCardHeader>

      {isMenuOpen ? (
        <ListMenu options={listMenuOptions(list)} />
      ) : (
        <S.ListCardInfoWrapper>
          <S.ListCardTotalPriceWrapper>
            <S.ListCardTotalPriceTextBold>Total: </S.ListCardTotalPriceTextBold>

            <S.ListCardTotalPriceTextRegular>
              {formatPriceWithCurrency(list.totalPrice, currency)}
            </S.ListCardTotalPriceTextRegular>
          </S.ListCardTotalPriceWrapper>

          <S.ListCardTotalPriceTextRegular>
            {totalPriceText}
          </S.ListCardTotalPriceTextRegular>
        </S.ListCardInfoWrapper>
      )}
    </S.ListCardWrapper>
  );
};
