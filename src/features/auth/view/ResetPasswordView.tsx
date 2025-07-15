import {
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import * as S from "./styles";
import Logo from "@/src/components/logo";
import { Link } from "expo-router";
import { useResetPasswordViewModel } from "../viewModel/useResetPasswordViewModel";
import { useTheme } from "styled-components/native";
import { DynamicForm } from "@/src/components/dynamicForm";
import { FeatherIconName } from "@/@types/icons";
import { LoadingSpinner } from "@/src/components/loadingSpinner";

export const ResetPasswordView = () => {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const { loading, handlePasswordReset } = useResetPasswordViewModel();

  const onSubmit = (data: Record<string, string>) => {
    handlePasswordReset(data.email);
  };

  const formFields = [
    {
      fieldName: "email",
      iconName: "mail" as FeatherIconName,
      placeholder: "Email",
      validationRules: {
        required: true,
      },
    },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <S.Container>
        <Logo color={colorScheme ?? "dark"} />

        <S.MainContent>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <DynamicForm
              formTitle="Informe o e-mail para redefinir sua senha."
              formFields={formFields}
              handleFormData={(formData: any) => onSubmit(formData)}
              submitBtnText="Enviar"
            />
          )}
        </S.MainContent>

        <S.SecondaryContentRow>
          <Link href="/" asChild dismissTo>
            <Pressable>
              <S.SecondaryContentText>Voltar</S.SecondaryContentText>
            </Pressable>
          </Link>
        </S.SecondaryContentRow>
      </S.Container>
    </KeyboardAvoidingView>
  );
};
