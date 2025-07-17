import { Alert } from "react-native";
import * as S from "./styles";
import { ListItemType } from "../../../listsManager/model/list";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";
import { centsToReais } from "@/src/utils/convertCurrency";

type ListItemCardProps = {
  listItem: ListItemType;
  itemIndex: number;
  removeItemFromList: (itemIndex: number) => void;
  setModalIsOpen: (state: boolean) => void;
  setCurrentItem: React.Dispatch<React.SetStateAction<ListItemType | null>>;
};

export const ListItemCard = ({
  listItem,
  itemIndex,
  setModalIsOpen,
  removeItemFromList,
  setCurrentItem,
}: ListItemCardProps) => {
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.medium.replace("px", ""));

  const handleRemoveItemFromList = () => {
    Alert.alert("Atenção!", `O item '${listItem.name}' será removido.`, [
      {
        text: "Cancelar",
      },
      {
        text: "Confirmar",
        onPress: () => removeItemFromList(itemIndex),
      },
    ]);
  };

  const handleEditItem = () => {
    setCurrentItem(listItem);
    setModalIsOpen(true);
  };

  return (
    <S.ListItemWrapper>
      <S.ListItemHeader>
        <S.ListItemName>{listItem.name}</S.ListItemName>

        <S.ListItemIconsRow>
          <Feather
            size={iconSize}
            color={theme.primaryColor}
            name="edit"
            onPress={() => handleEditItem()}
          />

          <Feather
            size={iconSize}
            color={theme.primaryColor}
            name="trash"
            onPress={() => handleRemoveItemFromList()}
          />
        </S.ListItemIconsRow>
      </S.ListItemHeader>

      <S.ListInfoRow>
        <S.ListItemPrice>
          Preço: R${centsToReais(listItem.price).toFixed(2)}
        </S.ListItemPrice>
        <S.ListItemQnt>Quantidade: {listItem.quantity}</S.ListItemQnt>
      </S.ListInfoRow>
    </S.ListItemWrapper>
  );
};
