import { useContext, useState } from "react";
import { GlobalUserContext } from "@/src/context/userContext";
import * as S from "./styles";
import {
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  Pressable,
  Alert,
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
  const [localPhotoUrl, setLocalPhotoUrl] = useState(
    currentUser?.user.photoURL ?? null
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
  ];

  const onSubmit = (data: Record<string, string>) => {
    const newName = data.displayName ?? currentUser?.user.displayName;
    handleUpdate(newName, localPhotoUrl);
  };

  const handlePickImage = async () => {
    const pickedImgURI = await pickImage();
    setLocalPhotoUrl(pickedImgURI ?? null);
  };

  const confirmResetPassword = () => {
    Alert.alert(
      "Atenção!",
      "Um link para recuperação de senha será enviado para o seu e-mail.",
      [
        {
          text: "Cancelar",
        },
        {
          text: "Continuar",
          onPress: () => handlePasswordReset(currentUser?.user.email ?? ""),
        },
      ]
    );
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
                {localPhotoUrl ? (
                  <S.UserInfoAvatarImage source={{ uri: localPhotoUrl }} />
                ) : (
                  <S.UserInfoAvatarDefaultContent>
                    {currentUser?.user.displayName?.split("")[0]}
                  </S.UserInfoAvatarDefaultContent>
                )}
              </S.UserInfoAvatarImgWrapper>

              <Pressable onPress={handlePickImage}>
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

        {!loading && (
          <Pressable onPress={confirmResetPassword}>
            <S.ContentText>Redefinir senha?</S.ContentText>
          </Pressable>
        )}
      </S.Container>
    </KeyboardAvoidingView>
  );
};
