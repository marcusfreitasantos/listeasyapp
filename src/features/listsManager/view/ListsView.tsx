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
import { getFormattedDate } from "@/src/utils/convertFirestoreTimestamp";
import { FeatherIconName } from "@/@types/icons";
import { ListEntityType } from "../model/list";

const ListsView = () => {
  const flatListRef = useRef<FlatList>(null);

  const {
    loading,
    searchTerm,
    currentUserLists,
    modalIsOpen,
    currency,
    isColaborator,
    createNewList,
    setSearchTerm,
    setModalIsOpen,
    handleDeleteList,
    handlePDFExport,
    getUserLists,
    handleRemoveCurrentUserFromSharedList,
    handleEditList,
    handleShareListAccess,
    t,
    i18n,
  } = useListManagerViewModel();

  const scrollToTop = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const listMenuOptions = (list: ListEntityType) => {
    return [
      {
        label: t("edit"),
        iconName: "edit" as FeatherIconName,
        onPress: () => handleEditList(list),
        showOption: true,
      },
      {
        label: t("share_access"),
        iconName: "share-2" as FeatherIconName,
        onPress: () => handleShareListAccess(list),
        showOption: true,
      },
      {
        label: t("pdf_export"),
        iconName: "file-text" as FeatherIconName,
        onPress: () => handlePDFExport(list),
        showOption: true,
      },
      {
        label: t("delete"),
        iconName: "trash" as FeatherIconName,
        onPress: () => handleDeleteList(list),
        showOption: !isColaborator,
      },
      {
        label: t("quit_list"),
        iconName: "delete" as FeatherIconName,
        onPress: () => handleRemoveCurrentUserFromSharedList(list),
        showOption: isColaborator,
      },
    ];
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
                  isColaborator={isColaborator}
                  currency={currency}
                  listCardSubtitle={t("shared")}
                  listMenuOptions={listMenuOptions}
                  totalPriceText={`${t("updated_at")}: ${getFormattedDate(
                    item.updatedAt,
                    i18n.language
                  )}`}
                  handleEditList={handleEditList}
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
