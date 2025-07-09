import {
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Pressable,
} from "react-native";
import * as S from "./styles";
import Logo from "@/src/components/logo";
import { Link } from "expo-router";
import { useSignUpViewModel } from "../viewModel/useSignUpViewModel";
import { useTheme } from "styled-components/native";
import { DynamicForm } from "@/src/components/dynamicForm";
import { FeatherIconName } from "@/@types/icons";

export const SignUpView = () => {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const { loading, handleSignUp } = useSignUpViewModel();

  const onSubmit = (data: Record<string, string>) => {
    handleSignUp(data.email, data.password, data.displayName);
  };

  const formFields = [
    {
      fieldName: "displayName",
      iconName: "user" as FeatherIconName,
      placeholder: "Seu nome e sobrenome",
      validationRules: {
        required: true,
        maxLength: 20,
        minLength: 3,
      },
    },
    {
      fieldName: "email",
      iconName: "mail" as FeatherIconName,
      placeholder: "E-mail",
      validationRules: {
        required: true,
      },
    },
    {
      fieldName: "password",
      iconName: "lock" as FeatherIconName,
      placeholder: "Senha",
      validationRules: {
        required: true,
        minLength: 8,
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
            <ActivityIndicator color={theme.primaryColor} style={{ flex: 1 }} />
          ) : (
            <DynamicForm
              formTitle="Cadastre-se gratuitamente."
              formFields={formFields}
              handleFormData={(formData: any) => onSubmit(formData)}
              submitBtnText="Cadastrar"
            />
          )}
        </S.MainContent>

        <S.SecondaryContentRow>
          <Link href="/" asChild dismissTo>
            <Pressable>
              <S.SecondaryContentText>
                Já tem conta? Faça login.
              </S.SecondaryContentText>
            </Pressable>
          </Link>

          <Link href="/+not-found">
            <Pressable>
              <S.SecondaryContentText>Precisa de ajuda?</S.SecondaryContentText>
            </Pressable>
          </Link>
        </S.SecondaryContentRow>
      </S.Container>
    </KeyboardAvoidingView>
  );
};
