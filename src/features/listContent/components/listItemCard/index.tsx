import * as S from "./styles";
import { ListItemType } from "../../../listsManager/model/list";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";

type ListItemCardProps = {
  listItem: ListItemType;
  setModalIsOpen: (state: boolean) => void;
};

export const ListItemCard = ({
  listItem,
  setModalIsOpen,
}: ListItemCardProps) => {
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.medium.replace("px", ""));

  return (
    <S.ListItemWrapper>
      <S.ListItemHeader>
        <S.ListItemName>{listItem.name}</S.ListItemName>

        <S.ListItemIconsRow>
          <Feather
            size={iconSize}
            color={theme.primaryColor}
            name="edit"
            onPress={() => setModalIsOpen(true)}
          />

          <Feather
            size={iconSize}
            color={theme.primaryColor}
            name="trash"
            onPress={() => console.log("remove item")}
          />
        </S.ListItemIconsRow>
      </S.ListItemHeader>

      <S.ListInfoRow>
        <S.ListItemPrice>Preço: R${listItem.price}</S.ListItemPrice>
        <S.ListItemQnt>Quantidade: {listItem.quantity}</S.ListItemQnt>
      </S.ListInfoRow>
    </S.ListItemWrapper>
  );
};
