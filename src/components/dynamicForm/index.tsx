import { useEffect } from "react";
import { KeyboardTypeOptions } from "react-native";
import * as S from "./styles";
import { Button } from "@/src/components/button";
import { useForm, Controller } from "react-hook-form";
import { InputField } from "@/src/components/inputField";
import { FeatherIconName } from "@/@types/icons";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
      errorMsg = t("required_field");
    } else if (fieldName === "password") {
      if (errorType === "minLength") {
        errorMsg = t("at_least_count_characters", { count: 8 });
      }
    } else if (errorType === "maxLength") {
      errorMsg = t("max_characters_exceeded");
    } else if (errorType === "minLength") {
      errorMsg = t("at_least_count_characters", { count: 3 });
    } else {
      errorMsg = t("unknown_error");
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
