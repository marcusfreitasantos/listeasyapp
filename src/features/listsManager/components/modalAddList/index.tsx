import * as S from "./styles";
import { DynamicForm } from "@/src/components/dynamicForm";
import { FeatherIconName } from "@/@types/icons";

type ModalAddListProps = {
  onSubmit: (listName: string) => void;
};

export const ModalAddList = ({ onSubmit }: ModalAddListProps) => {
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

  return (
    <S.ModalWrapper>
      <DynamicForm
        formTitle="Nova lista"
        formFields={formFields}
        handleFormData={(formData: any) => onSubmit(formData.listName)}
        submitBtnText="Criar"
      />
    </S.ModalWrapper>
  );
};
