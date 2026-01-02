import * as S from "./styles";
import { DynamicForm } from "@/src/components/dynamicForm";
import { FeatherIconName } from "@/@types/icons";
import { ListItemType } from "@/src/features/listsManager/model/list";
import { KeyboardTypeOptions } from "react-native";
import { centsToReais } from "@/src/utils/convertCurrency";
import { useTranslation } from "react-i18next";

type AddListItemModalProps = {
  handleAddListItemSubmit: (formData: ListItemType) => void;
  currentItem: ListItemType | null;
};

export const AddListItemModal = ({
  handleAddListItemSubmit,
  currentItem,
}: AddListItemModalProps) => {
  const { t } = useTranslation();

  const formFields = [
    {
      fieldName: "name",
      iconName: "file" as FeatherIconName,
      placeholder: t("item_name"),
      defaultValue: currentItem ? currentItem.name : "",
      validationRules: {
        required: true,
      },
    },
    {
      fieldName: "price",
      iconName: "dollar-sign" as FeatherIconName,
      placeholder: t("price"),
      defaultValue: currentItem
        ? centsToReais(currentItem.price).toFixed(2).toString()
        : "",
      keyboardType: "numeric" as KeyboardTypeOptions,
      validationRules: {
        required: false,
      },
    },
    {
      fieldName: "quantity",
      iconName: "grid" as FeatherIconName,
      placeholder: t("quantity"),
      defaultValue: currentItem ? currentItem.quantity.toString() : "",
      keyboardType: "numeric" as KeyboardTypeOptions,
      validationRules: {
        required: false,
      },
    },
    {
      fieldName: "details",
      iconName: "align-left" as FeatherIconName,
      placeholder: t("notes"),
      defaultValue: currentItem ? currentItem.details : "",
      validationRules: {
        required: false,
      },
    },
  ];

  return (
    <S.FormWrapper>
      <S.FormContent>
        <DynamicForm
          formTitle={
            currentItem ? `${t("edit")} '${currentItem.name}'` : t("new_item")
          }
          formFields={formFields}
          handleFormData={(formData: any) => handleAddListItemSubmit(formData)}
          submitBtnText={currentItem ? t("update") : t("create")}
        />
      </S.FormContent>
    </S.FormWrapper>
  );
};
