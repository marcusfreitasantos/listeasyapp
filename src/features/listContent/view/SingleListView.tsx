import { useContext, useState } from "react";
import { GlobalListContext } from "@/src/context/listContext";
import * as S from "./styles";
import { InputField } from "@/src/components/inputField";
import { ListItemCard } from "../components/listItemCard";
import { AddItemBtn } from "@/src/components/addItemBtn";
import { FlatList } from "react-native-gesture-handler";
import { ListEmpty } from "@/src/components/listEmpty";
import { AddListItemModal } from "../components/addListItemModal";

export const SingleListView = () => {
  const { currentList } = useContext(GlobalListContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  if (!currentList) return null;

  return (
    <S.ListView>
      <S.ListName>{currentList.title}</S.ListName>

      <InputField
        placeholder="Pesquisar item"
        iconName="search"
        onChangeText={(t) => setSearchTerm(t)}
      />

      <FlatList
        data={currentList.items.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ListItemCard listItem={item} />}
        ListEmptyComponent={() => <ListEmpty title="Nenhum item encontrado." />}
      />

      {modalIsOpen && <AddListItemModal />}

      <AddItemBtn
        modalIsOpen={modalIsOpen}
        onPress={() => setModalIsOpen(!modalIsOpen)}
      />
    </S.ListView>
  );
};
