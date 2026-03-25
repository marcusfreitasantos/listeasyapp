import * as S from "./styles";
import { InputField } from "@/src/components/inputField";
import { ListItemCard } from "../components/listItemCard";
import { AddItemBtn } from "@/src/components/addItemBtn";
import { FlatList } from "react-native-gesture-handler";
import { ListEmpty } from "@/src/components/listEmpty";
import { AddListItemModal } from "../components/addListItemModal";
import { useListContentViewModel } from "../viewModel/useListContentViewModel";
import { LoadingSpinner } from "@/src/components/loadingSpinner";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";
import { useRouter } from "expo-router";
import { ListTotalPrice } from "../components/listTotalPrice";
import { RenameListModal } from "../components/renameListModal";
import { ItemsFilter } from "../components/itemsFilter";
import { useTranslation } from "react-i18next";

export const SingleListView = () => {
  const { t } = useTranslation();
  const {
    currentList,
    searchTerm,
    setSearchTerm,
    modalIsOpen,
    setModalIsOpen,
    handleEditItem,
    updateSingleItem,
    loading,
    currentItem,
    setCurrentItem,
    renameModalIsOpen,
    setRenameModalIsOpen,
    updateListName,
    handleAddNewItem,
    showItemsFilter,
    setShowItemsFilter,
    setCurrentStatus,
    currentItems,
    handleAddListItemSubmit,
    currency,
    handleRemoveItemFromList,
    handleCheckItem,
  } = useListContentViewModel();

  const router = useRouter();
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.medium.replace("px", ""));

  if (!currentList || !currency) return null;

  return (
    <S.ListView>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <S.ListViewHeader>
            <S.ListViewHeaderGroup>
              <Feather
                size={iconSize}
                name="arrow-left"
                color={theme.primaryColor}
                onPress={() => router.push("/lists")}
              />

              <S.ListName numberOfLines={1}>{currentList.title}</S.ListName>
            </S.ListViewHeaderGroup>

            <Feather
              size={iconSize}
              name="edit"
              color={theme.primaryColor}
              onPress={() => setRenameModalIsOpen(!renameModalIsOpen)}
            />
          </S.ListViewHeader>

          {renameModalIsOpen && (
            <RenameListModal
              listName={currentList.title}
              handleSubmit={updateListName}
            />
          )}

          <S.SearchFormContainer>
            <Feather
              size={iconSize}
              name="sliders"
              color={theme.primaryColor}
              onPress={() => setShowItemsFilter(!showItemsFilter)}
            />
            <S.SearchFormWrapper>
              <InputField
                placeholder={t("search_item")}
                iconName="search"
                value={searchTerm}
                onChangeText={(t) => setSearchTerm(t)}
                marginBottom={false}
              />
            </S.SearchFormWrapper>
          </S.SearchFormContainer>

          {showItemsFilter && <ItemsFilter filterMethod={setCurrentStatus} />}

          <FlatList
            data={currentItems.filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase()),
            )}
            keyExtractor={(item) => (Math.random() + item.name).toString()}
            renderItem={({ item }) => (
              <ListItemCard
                listItem={item}
                currency={currency}
                handleCheckItem={handleCheckItem}
                handleRemoveItemFromList={handleRemoveItemFromList}
                handleEditItem={handleEditItem}
              />
            )}
            ListEmptyComponent={() => <ListEmpty title={t("no_items_found")} />}
          />

          {modalIsOpen && (
            <AddListItemModal
              handleAddListItemSubmit={handleAddListItemSubmit}
              currentItem={currentItem}
            />
          )}

          <S.ListViewFooter>
            <ListTotalPrice
              totalPrice={currentList.totalPrice}
              totalItems={currentList.items.length}
              currency={currency}
            />

            <AddItemBtn
              modalIsOpen={modalIsOpen}
              onPress={() => handleAddNewItem()}
            />
          </S.ListViewFooter>
        </>
      )}
    </S.ListView>
  );
};
