import * as S from "./styles";
import { DynamicForm } from "@/src/components/dynamicForm";
import { FeatherIconName } from "@/@types/icons";
import { ListItemType } from "@/src/features/listsManager/model/list";
import { KeyboardTypeOptions } from "react-native";

export const AddListItemModal = () => {
  const formFields = [
    {
      fieldName: "itemName",
      iconName: "list" as FeatherIconName,
      placeholder: "Nome do item",
      validationRules: {
        required: true,
      },
    },
    {
      fieldName: "itemPrice",
      iconName: "list" as FeatherIconName,
      placeholder: "Preço",
      keyboardType: "numeric" as KeyboardTypeOptions,
      validationRules: {
        required: true,
      },
    },
    {
      fieldName: "itemQnt",
      iconName: "list" as FeatherIconName,
      placeholder: "Quantidade",
      keyboardType: "numeric" as KeyboardTypeOptions,
      validationRules: {
        required: true,
      },
    },
  ];

  const handleSubmit = (formData: ListItemType) => {
    console.log(formData);
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
