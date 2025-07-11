import { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTheme } from "styled-components/native";
import { ListCard } from "../components/listCard";
import { FlatList } from "react-native-gesture-handler";
import * as S from "./styles";
import { InputField } from "@/src/components/inputField";
import { AddItemBtn } from "@/src/components/addItemBtn";
import { ModalAddList } from "../components/modalAddList";
import { useListManagerViewModel } from "../viewModel/useListManagerViewModel";

const ListsView = () => {
  const theme = useTheme();
  const flatListRef = useRef<FlatList>(null);

  const {
    loading,
    searchTerm,
    setSearchTerm,
    currentUserLists,
    createNewList,
    modalIsOpen,
    setModalIsOpen,
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
          <ActivityIndicator color={theme.primaryColor} />
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
              renderItem={({ item }) => <ListCard list={item} />}
            />
          </>
        )}

        {modalIsOpen && <ModalAddList onSubmit={createNewList} />}

        <AddItemBtn onPress={() => setModalIsOpen(!modalIsOpen)} />
      </S.ListView>
    </KeyboardAvoidingView>
  );
};

export default ListsView;
