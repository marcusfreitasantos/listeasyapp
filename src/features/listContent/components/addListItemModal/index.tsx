import * as S from "./styles";
import { DynamicForm } from "@/src/components/dynamicForm";
import { FeatherIconName } from "@/@types/icons";
import { ListItemType } from "@/src/features/listsManager/model/list";
import { KeyboardTypeOptions } from "react-native";
import { reaisToCents } from "@/src/utils/convertCurrency";

type AddListItemModalProps = {
  handleAddNewItem: (listItem: ListItemType) => void;
};

export const AddListItemModal = ({
  handleAddNewItem,
}: AddListItemModalProps) => {
  const formFields = [
    {
      fieldName: "name",
      iconName: "file" as FeatherIconName,
      placeholder: "Nome do item",
      validationRules: {
        required: true,
      },
    },
    {
      fieldName: "price",
      iconName: "dollar-sign" as FeatherIconName,
      placeholder: "Preço",
      keyboardType: "numeric" as KeyboardTypeOptions,
      validationRules: {
        required: true,
      },
    },
    {
      fieldName: "quantity",
      iconName: "grid" as FeatherIconName,
      placeholder: "Quantidade",
      keyboardType: "numeric" as KeyboardTypeOptions,
      validationRules: {
        required: true,
      },
    },
  ];

  const handleSubmit = (formData: ListItemType) => {
    const formatedData = {
      name: formData.name,
      price: reaisToCents(Number(formData.price)),
      quantity: Number(formData.quantity),
    };
    handleAddNewItem(formatedData);
  };

  return (
    <S.FormWrapper>
      <S.FormContent>
        <DynamicForm
          formTitle="Novo item"
          formFields={formFields}
          handleFormData={(formData: any) => handleSubmit(formData)}
          submitBtnText="Criar"
        />
      </S.FormContent>
    </S.FormWrapper>
  );
};
