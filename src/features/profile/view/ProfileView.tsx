import { useContext, useState } from "react";
import { GlobalUserContext } from "@/src/context/userContext";
import * as S from "./styles";
import { KeyboardAvoidingView, Platform, Pressable, Alert } from "react-native";
import { DynamicForm } from "@/src/components/dynamicForm";
import { useTheme } from "styled-components/native";
import { useUpdateProfileViewModel } from "../viewModel/useUpdateProfile";
import { LoadingSpinner } from "@/src/components/loadingSpinner";
import { useTranslation } from "react-i18next";

export const ProfileView = () => {
  const { t } = useTranslation();
  const { currentUser } = useContext(GlobalUserContext);
  const theme = useTheme();
  const {
    loading,
    handleUpdate,
    pickImage,
    fileMaxSize,
    formFields,
    confirmResetPassword,
  } = useUpdateProfileViewModel();
  const [localPhotoUrl, setLocalPhotoUrl] = useState(
    currentUser?.user.photoURL ?? null
  );

  const onSubmit = (data: Record<string, string>) => {
    const newName = data.displayName ?? currentUser?.user.displayName;
    handleUpdate(newName, localPhotoUrl);
  };

  const handlePickImage = async () => {
    const pickedImgURI = await pickImage();
    if (pickedImgURI) setLocalPhotoUrl(pickedImgURI ?? null);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <S.Container>
        <S.ContentTitle>{`${t("update")} ${t("profile")}`}</S.ContentTitle>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <S.UserInfoAvatarWrapper onPress={handlePickImage}>
              <S.UserInfoAvatarImgWrapper>
                {localPhotoUrl ? (
                  <S.UserInfoAvatarImage source={{ uri: localPhotoUrl }} />
                ) : (
                  <S.UserInfoAvatarDefaultContent>
                    {currentUser?.user.displayName?.split("")[0]}
                  </S.UserInfoAvatarDefaultContent>
                )}
              </S.UserInfoAvatarImgWrapper>

              <S.ContentText>{`${t("update")} ${t("image")}`}</S.ContentText>
              <S.ContentSubText>
                {t("max_size")}: {fileMaxSize}kb
              </S.ContentSubText>
            </S.UserInfoAvatarWrapper>

            {formFields.length > 0 && (
              <DynamicForm
                formFields={formFields}
                handleFormData={(formData: any) => onSubmit(formData)}
                submitBtnText={t("send")}
              />
            )}
          </>
        )}

        {!loading && (
          <Pressable onPress={confirmResetPassword}>
            <S.ContentText>{t("reset_password")}?</S.ContentText>
          </Pressable>
        )}
      </S.Container>
    </KeyboardAvoidingView>
  );
};
