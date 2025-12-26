import {
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Linking,
  Alert,
} from "react-native";
import * as S from "./styles";
import Logo from "@/src/components/logo";
import { Link } from "expo-router";
import { useSignInViewModel } from "../viewModel/useSignInViewModel";
import { useTheme } from "styled-components/native";
import { DynamicForm } from "@/src/components/dynamicForm";
import { FeatherIconName } from "@/@types/icons";
import { LoadingSpinner } from "@/src/components/loadingSpinner";
import { sendSupportEmail } from "@/src/utils/sendSupportEmail";
import { Button } from "@/src/components/button";

export const SignInView = () => {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const { loading, handleSignIn, handleAnonymousSignIn } = useSignInViewModel();

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

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <S.MainContent>
              <DynamicForm
                formTitle="Entre na sua conta"
                formFields={formFields}
                handleFormData={(formData: any) => onSubmit(formData)}
                submitBtnText="Entrar"
              />

              <S.SecondaryContentRow>
                <Link href="/resetPassword" asChild style={{ marginTop: 20 }}>
                  <Pressable>
                    <S.SecondaryContentText>
                      Recuperar senha
                    </S.SecondaryContentText>
                  </Pressable>
                </Link>

                <Link href="/signup" asChild style={{ marginTop: 20 }}>
                  <Pressable>
                    <S.SecondaryContentText>
                      Não tem uma conta? Crie aqui.
                    </S.SecondaryContentText>
                  </Pressable>
                </Link>
              </S.SecondaryContentRow>
            </S.MainContent>

            <S.SecondaryContentColumn>
              <Button
                btnText="Continuar sem cadastro"
                btnType="dark"
                onPress={handleAnonymousSignIn}
              />

              <Pressable onPress={() => sendSupportEmail()}>
                <S.SecondaryContentText>
                  Precisa de ajuda?
                </S.SecondaryContentText>
              </Pressable>
            </S.SecondaryContentColumn>
          </>
        )}
      </S.Container>
    </KeyboardAvoidingView>
  );
};
