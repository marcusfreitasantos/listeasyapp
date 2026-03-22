import * as S from "./styles";
import { ListItemType } from "../../../listsManager/model/list";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";
import { CheckboxInputField } from "@/src/components/checkboxdInputField";
import { useTranslation } from "react-i18next";
import { formatPriceWithCurrency } from "@/src/utils/formatPriceWithCurrency";

type ListItemCardProps = {
  listItem: ListItemType;
  currency: string;
  handleRemoveItemFromList: (itemName: string, itemId: string) => void;
  handleEditItem: (currenItem: ListItemType) => void;
  handleCheckItem: (isChecked: boolean, listItem: ListItemType) => void;
};

export const ListItemCard = ({
  listItem,
  currency,
  handleRemoveItemFromList,
  handleEditItem,
  handleCheckItem,
}: ListItemCardProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.medium.replace("px", ""));

  return (
    <S.ListItemWrapper onPress={() => handleEditItem(listItem)}>
      <S.ListItemHeader>
        <S.ListItemNameWrapper>
          <CheckboxInputField
            isItemChecked={listItem.checked ?? false}
            handleCheckItem={(isChecked: boolean) =>
              handleCheckItem(isChecked, listItem)
            }
          />
          <S.ListItemName numberOfLines={2}>{listItem.name}</S.ListItemName>
        </S.ListItemNameWrapper>

        <S.ListItemIconsRow>
          <Feather size={iconSize} color={theme.primaryColor} name="edit" />

          <Feather
            size={iconSize}
            color={theme.primaryColor}
            name="trash"
            onPress={() => handleRemoveItemFromList(listItem.name, listItem.id)}
            onPressIn={(e) => e.stopPropagation()}
            hitSlop={60}
          />
        </S.ListItemIconsRow>
      </S.ListItemHeader>

      {currency && (
        <S.ListInfoRow>
          <S.ListItemPrice>
            {t("price")}: {formatPriceWithCurrency(listItem.price, currency)}
          </S.ListItemPrice>
          <S.ListItemQnt>
            {t("quantity")}: {listItem.quantity}
          </S.ListItemQnt>
        </S.ListInfoRow>
      )}
    </S.ListItemWrapper>
  );
};
