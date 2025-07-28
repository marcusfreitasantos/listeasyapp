import * as S from "./styles";
import { Button } from "@/src/components/button";
import { useForm, Controller } from "react-hook-form";
import { InputField } from "@/src/components/inputField";
import { FeatherIconName } from "@/@types/icons";
import { KeyboardTypeOptions } from "react-native";
import { useEffect } from "react";

type DynamicFormProps = {
  formTitle?: string;
  submitBtnText: string;
  formFields: {
    fieldName: string;
    iconName: FeatherIconName;
    defaultValue?: string;
    placeholder: string;
    keyboardType?: KeyboardTypeOptions;
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
  submitBtnText,
  formFields,
  handleFormData,
}: DynamicFormProps) => {
  const formDefaultValues = formFields.reduce((acc, field) => {
    acc[field.fieldName] = field.defaultValue ?? "";
    return acc;
  }, {} as Record<string, string>);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Record<string, string>>({
    defaultValues: formDefaultValues,
  });

  const onSubmit = (data: Record<string, string>) => {
    handleFormData(data);
  };

  const handleNumericInput = (inputValue: string) => {
    // Remove all non-digit and non-dot/comma characters
    let sanitized = inputValue?.replace(/[^\d.,]/g, "");
    // Replace commas with dots
    sanitized = sanitized?.replace(/,/g, ".");
    // Prevent multiple dots: keep only the first dot
    sanitized = sanitized?.replace(/\.(?=.*\.)/g, "");
    return sanitized;
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

  useEffect(() => {
    reset(formDefaultValues);
  }, []);

  return (
    <S.FormWrapper>
      {formTitle && <S.FormTitle>{formTitle}</S.FormTitle>}

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
                    value={
                      item.keyboardType === "numeric"
                        ? handleNumericInput(value)
                        : value
                    }
                    onChangeText={onChange}
                    secureTextEntry={item.fieldName === "password"}
                    keyboardType={item.keyboardType ?? "default"}
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
        <Button onPress={handleSubmit(onSubmit)} btnText={submitBtnText} />
      </S.MainContentRow>
    </S.FormWrapper>
  );
};
