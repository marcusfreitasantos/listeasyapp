import { KeyboardAvoidingView, Platform } from "react-native";
import { useShareListsViewModel } from "../viewModel/useShareListsViewModel";
import { DynamicForm } from "@/src/components/dynamicForm";
import Feather from "@expo/vector-icons/Feather";
import { FeatherIconName } from "@/@types/icons";
import { LoadingSpinner } from "@/src/components/loadingSpinner";
import * as S from "./styles";
import { FlatList } from "react-native-gesture-handler";
import { FoundUserCard } from "../components/foundUserCard";
import { useRouter } from "expo-router";
import { useTheme } from "styled-components/native";
import { NotFoundUserCard } from "../components/notFoundUserCard";
import { ListEmpty } from "@/src/components/listEmpty";
import { useTranslation } from "react-i18next";

export const SharedListsView = () => {
  const { t } = useTranslation();
  const {
    currentList,
    loading,
    fetchUsersByEmail,
    foundUser,
    handleAddColaboratorToCurrentList,
    handleRemoveColaboratorFromCurrentList,
    isAlreadyColaborator,
    handleInvitationToNonUser,
    setInvitedUsereEmail,
  } = useShareListsViewModel();
  const formFields = [
    {
      fieldName: "userEmail",
      iconName: "user-plus" as FeatherIconName,
      placeholder: t("search_user_email"),
      validationRules: {
        required: true,
      },
    },
  ];

  const router = useRouter();
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.large.replace("px", ""));

  const onSubmit = (data: Record<string, string>) => {
    setInvitedUsereEmail(data.userEmail);
    fetchUsersByEmail(data.userEmail);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <S.Container>
        <S.ContentHeader>
          <Feather
            name="arrow-left"
            size={iconSize}
            color={theme.primaryColor}
            onPress={() => router.push("/lists")}
          />
          <S.ContentTitle>{t("invite_user")}</S.ContentTitle>
        </S.ContentHeader>

        <S.ContentSubtitle>
          {t("enter_email_address_to_invite_user")}: "{currentList?.title}".
        </S.ContentSubtitle>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <DynamicForm
              formFields={formFields}
              handleFormData={(formData: any) => onSubmit(formData)}
              submitBtnText={t("search")}
            />

            {currentList && (
              <>
                <S.ListTitle>{t("search_results")}</S.ListTitle>

                {foundUser ? (
                  <FoundUserCard
                    invitedUser={{
                      userId: foundUser.uid,
                      userEmail: foundUser.email,
                      userName: foundUser.displayName,
                    }}
                    alreadyInList={isAlreadyColaborator(foundUser.uid)}
                    handleAddColaborator={handleAddColaboratorToCurrentList}
                    currentList={currentList}
                    handleRemoveColaborator={
                      handleRemoveColaboratorFromCurrentList
                    }
                  />
                ) : (
                  <NotFoundUserCard sendInvite={handleInvitationToNonUser} />
                )}
              </>
            )}

            {currentList?.colaborators?.length ? (
              <>
                <S.ListTitle>
                  {t("colaborators")} {t("in")} "{currentList.title}"
                </S.ListTitle>

                <FlatList
                  data={currentList?.colaborators}
                  renderItem={({ item }) => (
                    <FoundUserCard
                      invitedUser={{
                        userId: item.userId,
                        userEmail: item.userEmail,
                        userName: item.userName,
                      }}
                      alreadyInList={true}
                      handleAddColaborator={handleAddColaboratorToCurrentList}
                      currentList={currentList}
                      handleRemoveColaborator={
                        handleRemoveColaboratorFromCurrentList
                      }
                    />
                  )}
                  ListEmptyComponent={() => (
                    <ListEmpty title={t("no_colaborators")} />
                  )}
                />
              </>
            ) : null}
          </>
        )}
      </S.Container>
    </KeyboardAvoidingView>
  );
};
