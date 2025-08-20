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

export const SharedListsView = () => {
  const {
    currentList,
    loading,
    fetchUsersByEmail,
    foundUsers,
    handleAddColaboratorToCurrentList,
    handleRemoveColaboratorFromCurrentList,
    isAlreadyColaborator,
  } = useShareListsViewModel();
  const formFields = [
    {
      fieldName: "userEmail",
      iconName: "user-plus" as FeatherIconName,
      placeholder: "Pesquisar e-mail do usuário",
      validationRules: {
        required: true,
      },
    },
  ];

  const router = useRouter();
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.large.replace("px", ""));

  const onSubmit = (data: Record<string, string>) => {
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
          <S.ContentTitle>Convidar usuário</S.ContentTitle>
        </S.ContentHeader>

        <S.ContentSubtitle>
          Digite o e-mail da pessoa que deseja enviar o convite para acessar a
          lista: "{currentList?.title}".
        </S.ContentSubtitle>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <DynamicForm
              formFields={formFields}
              handleFormData={(formData: any) => onSubmit(formData)}
              submitBtnText="Pesquisar"
            />

            {foundUsers && (
              <>
                <S.ListTitle>Resultado da sua busca</S.ListTitle>

                <FlatList
                  data={foundUsers}
                  renderItem={({ item }) => (
                    <FoundUserCard
                      invitedUser={{
                        userId: item.userId,
                        userEmail: item.userEmail,
                        userName: item.userName,
                      }}
                      alreadyInList={isAlreadyColaborator(item.userId)}
                      handleAddColaborator={handleAddColaboratorToCurrentList}
                      handleRemoveColaborator={
                        handleRemoveColaboratorFromCurrentList
                      }
                    />
                  )}
                  ListEmptyComponent={() => <NotFoundUserCard />}
                />
              </>
            )}

            {currentList?.colaborators && (
              <>
                <S.ListTitle>
                  Colaboradores em "{currentList.title}"
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
                      handleRemoveColaborator={
                        handleRemoveColaboratorFromCurrentList
                      }
                    />
                  )}
                />
              </>
            )}
          </>
        )}
      </S.Container>
    </KeyboardAvoidingView>
  );
};
