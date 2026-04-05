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
import { DynamicForm } from "@/src/components/dynamicForm";
import { FeatherIconName } from "@/@types/icons";
import { LoadingSpinner } from "@/src/components/loadingSpinner";
import { useTranslation } from "react-i18next";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";

export const ResetPasswordView = () => {
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.medium.replace("px", ""));
  const { t } = useTranslation();
  const colorScheme = useColorScheme() as "dark" | "light";
  const { loading, handlePasswordReset } = useResetPasswordViewModel();

  const onSubmit = (data: Record<string, string>) => {
    handlePasswordReset(data.email);
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
              formTitle={t("enter_your_email_to_reset_password")}
              formFields={formFields}
              handleFormData={(formData: any) => onSubmit(formData)}
              submitBtnText={t("send")}
            />
          )}
        </S.MainContent>

        <S.SecondaryContentRow>
          <Link href="/" asChild dismissTo>
            <S.HorizontalBtnIcon>
              <Feather
                name="arrow-left"
                color={theme.primaryColor}
                size={iconSize}
              />
              <S.SecondaryContentText>{t("back")}</S.SecondaryContentText>
            </S.HorizontalBtnIcon>
          </Link>
        </S.SecondaryContentRow>
      </S.Container>
    </KeyboardAvoidingView>
  );
};
