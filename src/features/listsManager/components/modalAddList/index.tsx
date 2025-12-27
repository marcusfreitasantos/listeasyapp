import * as S from "./styles";
import { DynamicForm } from "@/src/components/dynamicForm";
import { FeatherIconName } from "@/@types/icons";

type ModalAddListProps = {
  title: string;
  inputPlaceHolder: string;
  submitBtnText: string;
  onSubmit: (listName: string) => void;
};

export const ModalAddList = ({
  title,
  inputPlaceHolder,
  submitBtnText,
  onSubmit,
}: ModalAddListProps) => {
  const formFields = [
    {
      fieldName: "listName",
      iconName: "list" as FeatherIconName,
      placeholder: inputPlaceHolder,
      validationRules: {
        required: true,
      },
    },
  ];

  return (
    <S.ModalWrapper>
      <DynamicForm
        formTitle={title}
        formFields={formFields}
        handleFormData={(formData: any) => onSubmit(formData.listName)}
        submitBtnText={submitBtnText}
      />
    </S.ModalWrapper>
  );
};
