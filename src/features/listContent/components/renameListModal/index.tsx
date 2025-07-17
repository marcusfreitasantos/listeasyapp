import * as S from "./styles";
import { DynamicForm } from "@/src/components/dynamicForm";
import { FeatherIconName } from "@/@types/icons";

type RenameListModalProps = {
  listName: string;
  handleSubmit: (newListName: string) => void;
};

export const RenameListModal = ({
  listName,
  handleSubmit,
}: RenameListModalProps) => {
  const formFields = [
    {
      fieldName: "listName",
      iconName: "file" as FeatherIconName,
      placeholder: "Novo nome",
      defaultValue: listName ?? "",
      validationRules: {
        required: true,
      },
    },
  ];

  const onSubmit = (formData: { listName: string }) => {
    handleSubmit(formData.listName);
  };

  return (
    <S.FormWrapper>
      <DynamicForm
        formTitle=""
        formFields={formFields}
        handleFormData={(formData: any) => onSubmit(formData)}
        submitBtnText="Atualizar"
      />
    </S.FormWrapper>
  );
};
