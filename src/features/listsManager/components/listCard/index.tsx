import * as S from "./styles";
import { ListEntityType } from "../../model/list";
import Feather from "@expo/vector-icons/Feather";
import { FeatherIconName } from "@/@types/icons";
import { useTheme } from "styled-components/native";

type ListCardProps = {
  list: ListEntityType;
};

export const ListCard = ({ list }: ListCardProps) => {
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.medium.replace("px", ""));

  const openList = () => {
    console.log("List: ", list.title);
  };

  const openListMenu = () => {
    console.log("Menu for List: ", list.title);
  };

  return (
    <S.ListCardWrapper onPress={openList}>
      <S.ListCardInfoWrapper>
        <S.ListCardTitle numberOfLines={1}>{list.title}</S.ListCardTitle>
        <S.ListCardTotalPriceWrapper>
          <S.ListCardTotalPriceTextBold>Total: </S.ListCardTotalPriceTextBold>

          <S.ListCardTotalPriceTextRegular>
            {list.totalPrice}
          </S.ListCardTotalPriceTextRegular>
        </S.ListCardTotalPriceWrapper>
      </S.ListCardInfoWrapper>

      <S.ListCardMenuBtn onPress={openListMenu}>
        <Feather
          size={iconSize}
          color={theme.primaryColor}
          name="more-vertical"
        />
      </S.ListCardMenuBtn>
    </S.ListCardWrapper>
  );
};
