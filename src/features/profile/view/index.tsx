import { useContext, useState } from "react";
import { GlobalUserContext } from "@/src/context/userContext";
import * as S from "./styles";
import {
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  Pressable,
} from "react-native";
import { DynamicForm } from "@/src/components/dynamicForm";
import { useTheme } from "styled-components/native";
import { FeatherIconName } from "@/@types/icons";
import { useResetPasswordViewModel } from "../../auth/viewModel/useResetPasswordViewModel";
import { useUpdateProfileViewModel } from "../viewModel/useUpdateProfile";

export const ProfileView = () => {
  const { currentUser } = useContext(GlobalUserContext);
  const theme = useTheme();
  const { handlePasswordReset } = useResetPasswordViewModel();
  const { loading, handleUpdate, pickImage } = useUpdateProfileViewModel();
  const [newPhotoURL, setNewPhotoURL] = useState(
    "https://mafreitas.com.br/wp-content/themes/mafreitas/assets/img/img-inicio.png"
  );

  const formFields = [
    {
      fieldName: "displayName",
      iconName: "user" as FeatherIconName,
      placeholder: currentUser?.user.displayName ?? "Seu nome",
      validationRules: {
        required: false,
      },
    },
    {
      fieldName: "email",
      iconName: "mail" as FeatherIconName,
      placeholder: currentUser?.user.email ?? "Seu e-mail",
      validationRules: {
        required: false,
      },
    },
  ];

  const onSubmit = (data: Record<string, string>) => {
    const newName = data.displayName ?? currentUser?.user.displayName;
    const newEmail = data.email ?? currentUser?.user.email;
    handleUpdate(newName, newEmail, newPhotoURL);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <S.Container>
        <S.ContentTitle>Atualizar perfil</S.ContentTitle>
        {loading ? (
          <ActivityIndicator color={theme.primaryColor} style={{ flex: 1 }} />
        ) : (
          <>
            <S.UserInfoAvatarWrapper>
              <S.UserInfoAvatarImgWrapper>
                {!currentUser?.user.photoURL ? (
                  <S.UserInfoAvatarDefaultContent>
                    {currentUser?.user.displayName?.split("")[0]}
                  </S.UserInfoAvatarDefaultContent>
                ) : (
                  <S.UserInfoAvatarImage
                    source={{ uri: currentUser.user.photoURL }}
                  />
                )}
              </S.UserInfoAvatarImgWrapper>

              <Pressable onPress={pickImage}>
                <S.ContentText>Alterar imagem</S.ContentText>
              </Pressable>
            </S.UserInfoAvatarWrapper>

            <DynamicForm
              formFields={formFields}
              handleFormData={(formData: any) => onSubmit(formData)}
              submitBtnText="Enviar"
            />
          </>
        )}

        <Pressable
          onPress={() => handlePasswordReset(currentUser?.user.email ?? "")}
        >
          <S.ContentText>Redefinir senha?</S.ContentText>
        </Pressable>
      </S.Container>
    </KeyboardAvoidingView>
  );
};
