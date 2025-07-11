import { useState } from "react";
import { ActivityIndicator } from "react-native";
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { loading, searchTerm, setSearchTerm, currentUserLists } =
    useListManagerViewModel();

  return (
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
            data={currentUserLists.filter((list) =>
              list.title.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ListCard list={item} />}
          />
        </>
      )}

      {modalIsOpen && <ModalAddList />}

      <AddItemBtn onPress={() => setModalIsOpen(!modalIsOpen)} />
    </S.ListView>
  );
};

export default ListsView;
