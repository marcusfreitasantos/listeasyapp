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
import { useSignInViewModel } from "../viewModel/useSignInViewModel";
import { useTheme } from "styled-components/native";
import { DynamicForm } from "@/src/components/dynamicForm";
import Feather from "@expo/vector-icons/Feather";
import { ComponentProps } from "react";

type FeatherIconName = ComponentProps<typeof Feather>["name"];

export const SignInView = () => {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const { loading, handleSignIn } = useSignInViewModel();

  const onSubmit = (data: Record<string, string>) => {
    handleSignIn(data.email, data.password);
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
              formTitle="Fazer login"
              formFields={formFields}
              handleFormData={(formData: any) => onSubmit(formData)}
              submitBtnText="Entrar"
            />
          )}

          <Link href="/+not-found" asChild style={{ marginTop: 20 }}>
            <Pressable>
              <S.SecondaryContentText>Recuperar senha</S.SecondaryContentText>
            </Pressable>
          </Link>
        </S.MainContent>

        <S.SecondaryContentRow>
          <Link href="/signUp" asChild dismissTo>
            <Pressable>
              <S.SecondaryContentText>
                Não tem uma conta? Crie aqui.
              </S.SecondaryContentText>
            </Pressable>
          </Link>

          <Link href="/+not-found" asChild>
            <Pressable>
              <S.SecondaryContentText>Precisa de ajuda?</S.SecondaryContentText>
            </Pressable>
          </Link>
        </S.SecondaryContentRow>
      </S.Container>
    </KeyboardAvoidingView>
  );
};
