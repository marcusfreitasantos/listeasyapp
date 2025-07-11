import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";
import { SampleLists } from "@/src/mocks/lists";
import { ListCard } from "../components/listCard";
import { ListEntityType } from "../model/list";
import { FlatList } from "react-native-gesture-handler";
import * as S from "./styles";
import { InputField } from "@/src/components/inputField";
import { AddItemBtn } from "@/src/components/addItemBtn";
import { ModalAddList } from "../components/modalAddList";

const ListsView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const theme = useTheme();
  const [currentUserLists, setCurrentUserLists] = useState<
    ListEntityType[] | []
  >(SampleLists);

  return (
    <S.ListView>
      {isLoading ? (
        <ActivityIndicator color={theme.primaryColor} />
      ) : (
        <>
          <InputField placeholder="Pesquisar" iconName="search" />

          <FlatList
            data={currentUserLists}
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
