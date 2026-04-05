import {
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import * as S from "./styles";
import Logo from "@/src/components/logo";
import { Link } from "expo-router";
import { useSignUpViewModel } from "../viewModel/useSignUpViewModel";
import { DynamicForm } from "@/src/components/dynamicForm";
import { FeatherIconName } from "@/@types/icons";
import { LoadingSpinner } from "@/src/components/loadingSpinner";
import { sendSupportEmail } from "@/src/utils/sendSupportEmail";
import { useTranslation } from "react-i18next";

export const SignUpView = () => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() as "dark" | "light";
  const { loading, handleSignUp, isAnonymous } = useSignUpViewModel();

  const onSubmit = (data: Record<string, string>) => {
    handleSignUp(data.email, data.password, data.displayName);
  };

  const formFields = [
    {
      fieldName: "displayName",
      iconName: "user" as FeatherIconName,
      placeholder: t("name_lastname"),
      validationRules: {
        required: true,
        minLength: 3,
      },
    },
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

        <S.MainContent>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <DynamicForm
              formTitle={t("register_for_free")}
              formFields={formFields}
              handleFormData={(formData: any) => onSubmit(formData)}
              submitBtnText={t("register")}
            />
          )}
        </S.MainContent>

        <S.SecondaryContentRow>
          <Link href={isAnonymous ? "/lists" : "/"} asChild dismissTo>
            <Pressable>
              <S.SecondaryContentText>
                {isAnonymous ? t("back") : t("already_user")}
              </S.SecondaryContentText>
            </Pressable>
          </Link>

          <Pressable
            onPress={() =>
              sendSupportEmail(
                t("support_email_subject"),
                t("email_not_opened"),
              )
            }
          >
            <S.SecondaryContentText>{t("need_help")}</S.SecondaryContentText>
          </Pressable>
        </S.SecondaryContentRow>
      </S.Container>
    </KeyboardAvoidingView>
  );
};
