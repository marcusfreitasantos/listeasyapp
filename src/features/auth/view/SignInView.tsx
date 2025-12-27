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
import { useTranslation } from "react-i18next";

export const SignInView = () => {
  const { t } = useTranslation();
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
      placeholder: t("email"),
      validationRules: {
        required: true,
      },
    },
    {
      fieldName: "password",
      iconName: "lock" as FeatherIconName,
      placeholder: t("password"),
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
                formTitle={t("login_to_account")}
                formFields={formFields}
                handleFormData={(formData: any) => onSubmit(formData)}
                submitBtnText={t("login")}
              />

              <S.SecondaryContentRow>
                <Link href="/resetPassword" asChild style={{ marginTop: 20 }}>
                  <Pressable>
                    <S.SecondaryContentText>
                      {t("reset_password")}
                    </S.SecondaryContentText>
                  </Pressable>
                </Link>

                <Link href="/signup" asChild style={{ marginTop: 20 }}>
                  <Pressable>
                    <S.SecondaryContentText>
                      {t("no_account")}
                    </S.SecondaryContentText>
                  </Pressable>
                </Link>
              </S.SecondaryContentRow>
            </S.MainContent>

            <S.SecondaryContentColumn>
              <Button
                btnText={t("continue_without_register")}
                btnType="dark"
                btnStyle="outline"
                onPress={handleAnonymousSignIn}
              />

              <Pressable onPress={() => sendSupportEmail()}>
                <S.SecondaryContentText>
                  {t("need_help")}
                </S.SecondaryContentText>
              </Pressable>
            </S.SecondaryContentColumn>
          </>
        )}
      </S.Container>
    </KeyboardAvoidingView>
  );
};
