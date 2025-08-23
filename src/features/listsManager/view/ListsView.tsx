import { useEffect, useRef } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ListCard } from "../components/listCard";
import { FlatList } from "react-native-gesture-handler";
import * as S from "./styles";
import { InputField } from "@/src/components/inputField";
import { AddItemBtn } from "@/src/components/addItemBtn";
import { ModalAddList } from "../components/modalAddList";
import { useListManagerViewModel } from "../viewModel/useListManagerViewModel";
import { ListEmpty } from "@/src/components/listEmpty";
import { LoadingSpinner } from "@/src/components/loadingSpinner";
import { useShareListsViewModel } from "../../sharedLists/viewModel/useShareListsViewModel";

const ListsView = () => {
  const flatListRef = useRef<FlatList>(null);
  const { handleRemoveColaboratorFromCurrentList } = useShareListsViewModel();

  const {
    loading,
    searchTerm,
    setSearchTerm,
    currentUserLists,
    createNewList,
    modalIsOpen,
    setModalIsOpen,
    removeList,
    generatePdf,
  } = useListManagerViewModel();

  const scrollToTop = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToTop();
  }, [currentUserLists]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <S.ListView>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <InputField
              placeholder="Pesquisar"
              iconName="search"
              onChangeText={(t) => setSearchTerm(t)}
            />

            <FlatList
              ref={flatListRef}
              data={currentUserLists.filter((list) =>
                list.title.toLowerCase().includes(searchTerm.toLowerCase())
              )}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ListCard
                  list={item}
                  removeList={removeList}
                  generatePdf={generatePdf}
                  removeCurrentUserFromSharedList={
                    handleRemoveColaboratorFromCurrentList
                  }
                />
              )}
              ListEmptyComponent={() => (
                <ListEmpty
                  title="Nenhuma lista encontrada."
                  text="Crie sua primeira lista com o botão abaixo."
                />
              )}
            />
            {modalIsOpen && <ModalAddList onSubmit={createNewList} />}

            <S.ListViewFooter>
              <AddItemBtn
                modalIsOpen={modalIsOpen}
                onPress={() => setModalIsOpen(!modalIsOpen)}
              />
            </S.ListViewFooter>
          </>
        )}
      </S.ListView>
    </KeyboardAvoidingView>
  );
};

export default ListsView;
