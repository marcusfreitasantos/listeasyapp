import { Alert } from "react-native";
import * as S from "./styles";
import { ListItemType } from "../../../listsManager/model/list";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";
import { centsToReais } from "@/src/utils/convertCurrency";
import { CheckboxInputField } from "@/src/components/checkboxdInputField";

type ListItemCardProps = {
  listItem: ListItemType;
  itemId: string;
  removeItemFromList: (itemId: string) => void;
  setModalIsOpen: (state: boolean) => void;
  updateItemInList: (listItem: ListItemType) => void;
  setCurrentItem: React.Dispatch<React.SetStateAction<ListItemType | null>>;
};

export const ListItemCard = ({
  listItem,
  itemId,
  setModalIsOpen,
  removeItemFromList,
  updateItemInList,
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
        onPress: () => removeItemFromList(itemId),
      },
    ]);
  };

  const handleEditItem = () => {
    setCurrentItem({ ...listItem });
    setModalIsOpen(true);
  };

  const handleCheckItem = (isChecked: boolean) => {
    setCurrentItem({ ...listItem, checked: isChecked });
    updateItemInList({ ...listItem, checked: isChecked });
  };

  return (
    <S.ListItemWrapper onPress={() => handleEditItem()}>
      <S.ListItemHeader>
        <S.ListItemNameWrapper>
          <CheckboxInputField
            isItemChecked={listItem.checked ?? false}
            handleCheckItem={(isChecked: boolean) => handleCheckItem(isChecked)}
          />
          <S.ListItemName>{listItem.name}</S.ListItemName>
        </S.ListItemNameWrapper>

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
