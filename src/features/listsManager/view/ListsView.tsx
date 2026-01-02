import { useEffect, useRef } from "react";
import { KeyboardAvoidingView, Platform, RefreshControl } from "react-native";
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
import { useTranslation } from "react-i18next";

const ListsView = () => {
  const { t } = useTranslation();
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
    getUserLists,
    currency,
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
              placeholder={t("search")}
              iconName="search"
              onChangeText={(t) => setSearchTerm(t)}
            />

            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={() => getUserLists()}
                />
              }
              ref={flatListRef}
              data={currentUserLists.filter((list) =>
                list.title.toLowerCase().includes(searchTerm.toLowerCase())
              )}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ListCard
                  list={item}
                  currency={currency}
                  removeList={removeList}
                  generatePdf={generatePdf}
                  removeCurrentUserFromSharedList={
                    handleRemoveColaboratorFromCurrentList
                  }
                />
              )}
              ListEmptyComponent={() => (
                <ListEmpty
                  title={t("no_lists_found")}
                  text={t("create_your_first_list")}
                />
              )}
            />
            {modalIsOpen && (
              <ModalAddList
                onSubmit={createNewList}
                title={t("new_list")}
                inputPlaceHolder={t("list_name")}
                submitBtnText={t("create")}
              />
            )}

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
