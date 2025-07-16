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
import { centsToReais } from "@/src/utils/convertCurrency";

export const SingleListView = () => {
  const {
    currentList,
    searchTerm,
    setSearchTerm,
    modalIsOpen,
    setModalIsOpen,
    updateListItems,
    loading,
    removeItemFromList,
    calculateCurrentListTotal,
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

            <S.ListTotal>
              Total: R$ {centsToReais(calculateCurrentListTotal()).toFixed(2)}
            </S.ListTotal>
          </S.ListViewHeader>

          <InputField
            placeholder="Pesquisar item"
            iconName="search"
            onChangeText={(t) => setSearchTerm(t)}
          />

          <FlatList
            data={currentList.items.filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            keyExtractor={(item) => (Math.random() + item.name).toString()}
            renderItem={({ item, index }) => (
              <ListItemCard
                listItem={item}
                setModalIsOpen={setModalIsOpen}
                itemIndex={index}
                removeItemFromList={removeItemFromList}
              />
            )}
            ListEmptyComponent={() => (
              <ListEmpty title="Nenhum item encontrado." />
            )}
          />

          {modalIsOpen && (
            <AddListItemModal handleAddNewItem={updateListItems} />
          )}

          <AddItemBtn
            modalIsOpen={modalIsOpen}
            onPress={() => setModalIsOpen(!modalIsOpen)}
          />
        </>
      )}
    </S.ListView>
  );
};
