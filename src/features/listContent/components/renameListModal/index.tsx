import * as S from "./styles";
import { DynamicForm } from "@/src/components/dynamicForm";
import { FeatherIconName } from "@/@types/icons";
import { useTranslation } from "react-i18next";

type RenameListModalProps = {
  listName: string;
  handleSubmit: (newListName: string) => void;
};

export const RenameListModal = ({
  listName,
  handleSubmit,
}: RenameListModalProps) => {
  const { t } = useTranslation();

  const formFields = [
    {
      fieldName: "listName",
      iconName: "file" as FeatherIconName,
      placeholder: t("new_name"),
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
        submitBtnText={t("update")}
      />
    </S.FormWrapper>
  );
};
