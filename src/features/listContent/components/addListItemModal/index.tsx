import * as S from "./styles";
import { DynamicForm } from "@/src/components/dynamicForm";
import { FeatherIconName } from "@/@types/icons";
import { ListItemType } from "@/src/features/listsManager/model/list";
import { KeyboardTypeOptions } from "react-native";
import { reaisToCents, centsToReais } from "@/src/utils/convertCurrency";

type AddListItemModalProps = {
  handleAddNewItem: (listItem: ListItemType) => void;
  currentItem: ListItemType | null;
};

export const AddListItemModal = ({
  handleAddNewItem,
  currentItem,
}: AddListItemModalProps) => {
  const formFields = [
    {
      fieldName: "name",
      iconName: "file" as FeatherIconName,
      placeholder: currentItem ? currentItem.name : "Nome do item",
      validationRules: {
        required: true,
      },
    },
    {
      fieldName: "price",
      iconName: "dollar-sign" as FeatherIconName,
      placeholder: currentItem
        ? centsToReais(currentItem.price).toFixed(2).toString()
        : "Preço",
      keyboardType: "numeric" as KeyboardTypeOptions,
      validationRules: {
        required: true,
      },
    },
    {
      fieldName: "quantity",
      iconName: "grid" as FeatherIconName,
      placeholder: currentItem ? currentItem.quantity.toString() : "Quantidade",
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
          formTitle={currentItem ? `Editar '${currentItem.name}'` : "Novo item"}
          formFields={formFields}
          handleFormData={(formData: any) => handleSubmit(formData)}
          submitBtnText={currentItem ? "Atualizar" : "Criar"}
        />
      </S.FormContent>
    </S.FormWrapper>
  );
};
