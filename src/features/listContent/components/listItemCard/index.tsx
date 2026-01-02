import { Alert } from "react-native";
import * as S from "./styles";
import { ListItemType } from "../../../listsManager/model/list";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";
import { CheckboxInputField } from "@/src/components/checkboxdInputField";
import { useTranslation } from "react-i18next";
import { formatPriceWithCurrency } from "@/src/utils/formatPriceWithCurrency";

type ListItemCardProps = {
  listItem: ListItemType;
  itemId: string;
  currency: string;
  removeItemFromList: (itemId: string) => void;
  setModalIsOpen: (state: boolean) => void;
  updateSingleItem: (listItem: ListItemType) => void;
  setCurrentItem: React.Dispatch<React.SetStateAction<ListItemType | null>>;
};

export const ListItemCard = ({
  listItem,
  itemId,
  currency,
  setModalIsOpen,
  removeItemFromList,
  updateSingleItem,
  setCurrentItem,
}: ListItemCardProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.medium.replace("px", ""));

  const handleRemoveItemFromList = () => {
    Alert.alert(
      t("warning"),
      t("item_will_be_removed", { item_name: listItem.name }),
      [
        {
          text: t("cancel"),
        },
        {
          text: t("confirm"),
          onPress: () => removeItemFromList(itemId),
        },
      ]
    );
  };

  const handleEditItem = () => {
    setCurrentItem({ ...listItem });
    setModalIsOpen(true);
  };

  const handleCheckItem = (isChecked: boolean) => {
    setCurrentItem({ ...listItem, checked: isChecked });
    updateSingleItem({ ...listItem, checked: isChecked });
  };

  return (
    <S.ListItemWrapper onPress={() => handleEditItem()}>
      <S.ListItemHeader>
        <S.ListItemNameWrapper>
          <CheckboxInputField
            isItemChecked={listItem.checked ?? false}
            handleCheckItem={(isChecked: boolean) => handleCheckItem(isChecked)}
          />
          <S.ListItemName numberOfLines={2}>{listItem.name}</S.ListItemName>
        </S.ListItemNameWrapper>

        <S.ListItemIconsRow>
          <Feather size={iconSize} color={theme.primaryColor} name="edit" />

          <Feather
            size={iconSize}
            color={theme.primaryColor}
            name="trash"
            onPress={() => handleRemoveItemFromList()}
            onPressIn={(e) => e.stopPropagation()}
            hitSlop={60}
          />
        </S.ListItemIconsRow>
      </S.ListItemHeader>

      <S.ListInfoRow>
        <S.ListItemPrice>
          {t("price")}: {formatPriceWithCurrency(listItem.price, currency)}
        </S.ListItemPrice>
        <S.ListItemQnt>
          {t("quantity")}: {listItem.quantity}
        </S.ListItemQnt>
      </S.ListInfoRow>
    </S.ListItemWrapper>
  );
};
