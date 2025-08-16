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

export const SingleListView = () => {
  const {
    currentList,
    searchTerm,
    setSearchTerm,
    modalIsOpen,
    setModalIsOpen,
    updateListItems,
    removeItemFromList,
    updateItemInList,
    loading,
    currentItem,
    setCurrentItem,
    renameModalIsOpen,
    setRenameModalIsOpen,
    updateListName,
    handleAddNewItem,
    showItemsFilter,
    setShowItemsFilter,
    filterItemsByStatus,
    currentItems,
  } = useListContentViewModel();

  const router = useRouter();
  const theme = useTheme();

  if (!currentList) return null;

  return (
    <S.ListView>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <S.ListViewHeader>
            <S.ListViewHeaderGroup>
              <Feather
                size={24}
                name="arrow-left"
                color={theme.primaryColor}
                onPress={() => router.push("/lists")}
              />

              <S.ListName numberOfLines={1}>{currentList.title}</S.ListName>
            </S.ListViewHeaderGroup>

            <Feather
              size={24}
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
              size={24}
              name="sliders"
              color={theme.primaryColor}
              onPress={() => setShowItemsFilter(!showItemsFilter)}
            />
            <S.SearchFormWrapper>
              <InputField
                placeholder="Pesquisar item"
                iconName="search"
                value={searchTerm}
                onChangeText={(t) => setSearchTerm(t)}
                marginBottom={false}
              />
            </S.SearchFormWrapper>
          </S.SearchFormContainer>

          {showItemsFilter && (
            <ItemsFilter filterMethod={filterItemsByStatus} />
          )}

          <FlatList
            data={currentItems.filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            keyExtractor={(item) => (Math.random() + item.name).toString()}
            renderItem={({ item }) => (
              <ListItemCard
                listItem={item}
                setModalIsOpen={setModalIsOpen}
                itemId={item.id}
                updateItemInList={updateItemInList}
                removeItemFromList={removeItemFromList}
                setCurrentItem={setCurrentItem}
              />
            )}
            ListEmptyComponent={() => (
              <ListEmpty title="Nenhum item encontrado." />
            )}
          />

          {modalIsOpen && (
            <AddListItemModal
              handleAddNewItem={updateListItems}
              handleEditItem={updateItemInList}
              currentItem={currentItem}
            />
          )}

          <S.ListViewFooter>
            <ListTotalPrice
              totalPrice={currentList.totalPrice}
              totalItems={currentList.items.length}
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
