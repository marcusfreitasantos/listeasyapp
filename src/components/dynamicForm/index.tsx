import * as S from "./styles";
import { Button } from "@/src/components/button";
import { useForm, Controller } from "react-hook-form";
import { InputField } from "../inputField";
import Feather from "@expo/vector-icons/Feather";
import { ComponentProps } from "react";

type FeatherIconName = ComponentProps<typeof Feather>["name"];

type DynamicFormProps = {
  formTitle: string;
  formFields: {
    fieldName: string;
    iconName: FeatherIconName;
    placeholder: string;
    validationRules: {
      required: boolean;
      maxLength?: number;
      minLength?: number;
    };
  }[];
  handleFormData: (data: Record<string, string>) => void;
};

export const DynamicForm = ({
  formTitle,
  formFields,
  handleFormData,
}: DynamicFormProps) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Record<string, string>>();

  const onSubmit = (data: Record<string, string>) => {
    handleFormData(data);
  };

  const handleFormErrors = (fieldName: string, errorType: string) => {
    let errorMsg = "";

    if (errorType === "required") {
      errorMsg = "Campo obrigatório!";
    } else if (fieldName === "firstName" || fieldName === "lastName") {
      if (errorType === "maxLength") {
        errorMsg = "Número de caracteres excedido.";
      } else {
        errorMsg = "Este campo precisa ter no mínimo 3 caracteres";
      }
    } else if (fieldName === "password") {
      if (errorType === "minLength") {
        errorMsg = "Este campo precisa ter no mínimo 8 caracteres";
      }
    } else {
      errorMsg = "";
    }

    return errorMsg;
  };
  return (
    <S.FormWrapper>
      {formTitle && <S.MainContentText>{formTitle}</S.MainContentText>}

      {formFields &&
        formFields.map((item) => {
          return (
            <S.FormField key={item.fieldName}>
              <Controller
                control={control}
                name={item.fieldName as string}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    {...register(item.fieldName, item.validationRules)}
                    iconName={item.iconName}
                    placeholder={item.placeholder}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={item.fieldName === "password"}
                  />
                )}
              />
              {errors && errors[item.fieldName] && (
                <S.FormErrorText>
                  {handleFormErrors(
                    item.fieldName,
                    errors[item.fieldName]?.type ?? ""
                  )}
                </S.FormErrorText>
              )}
            </S.FormField>
          );
        })}

      <S.MainContentRow>
        <Button onPress={handleSubmit(onSubmit)} />
      </S.MainContentRow>
    </S.FormWrapper>
  );
};
