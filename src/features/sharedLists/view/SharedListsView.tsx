import { KeyboardAvoidingView, Platform } from "react-native";
import { useShareListsViewModel } from "../viewModel/useShareListsViewModel";
import { DynamicForm } from "@/src/components/dynamicForm";
import { FeatherIconName } from "@/@types/icons";
import { LoadingSpinner } from "@/src/components/loadingSpinner";
import * as S from "./styles";
import { FlatList } from "react-native-gesture-handler";
import { FoundUserCard } from "../components/foundUserCard";

export const SharedListsView = () => {
  const {
    currentList,
    loading,
    fetchUsersByEmail,
    foundUsers,
    handleAddUserToCurrentList,
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

  const onSubmit = (data: Record<string, string>) => {
    fetchUsersByEmail(data.userEmail);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <S.Container>
        <S.ContentTitle>Convidar usuário</S.ContentTitle>

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
                <S.ListTitle>Usuários encontrados</S.ListTitle>

                <FlatList
                  data={foundUsers}
                  renderItem={({ item }) => (
                    <FoundUserCard
                      email={item.userEmail}
                      name={item.userName}
                      btnOnPress={handleAddUserToCurrentList}
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
