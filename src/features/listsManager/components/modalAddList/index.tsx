import * as S from "./styles";
import { DynamicForm } from "@/src/components/dynamicForm";
import { FeatherIconName } from "@/@types/icons";
import { useState } from "react";

export const ModalAddList = () => {
  const formFields = [
    {
      fieldName: "listName",
      iconName: "list" as FeatherIconName,
      placeholder: "Nome da lista",
      validationRules: {
        required: true,
      },
    },
  ];

  const onSubmit = (formData: any) => {
    console.log(formData);
  };

  return (
    <S.ModalWrapper>
      <DynamicForm
        formTitle="Nova lista"
        formFields={formFields}
        handleFormData={(formData: any) => onSubmit(formData)}
        submitBtnText="Criar"
      />
    </S.ModalWrapper>
  );
};
