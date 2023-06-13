import { useEffect } from "react";
import { FlatList } from "react-native";
import ListBox from "../../components/ListBox";
import * as S from "./styles";
import CreateListModal from "../../components/CreateListModal";
import { getLists } from "../../services/ListQueries";
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useIsFocused } from "@react-navigation/native";
import PlusButton from "../../components/PlusButton";
import EmptyFlatListItem from "../../components/EmptyFlatListItem";

export default () => {
  const isFocused = useIsFocused();

  const {
    totalLists,
    setTotalLists,
    userLists,
    setUserLists,
    updatedList,
    setScreenName,
    modal,
    setModal,
  } = useContext(GlobalContext);

  async function showLists() {
    const allLists = await getLists();
    setTotalLists(allLists.length);
    setUserLists(allLists);
  }

  useEffect(() => {
    showLists();
  }, [updatedList]);

  useEffect(() => {
    if (isFocused) {
      setScreenName("MainScreen");
    }
  }, [isFocused]);

  return (
    <S.Container>
      <S.ItemsGroup>
        <FlatList
          data={userLists}
          renderItem={(list) => <ListBox key={list.listID} data={list} />}
          keyExtractor={(list) => list.listID}
          ListEmptyComponent={
            <EmptyFlatListItem
              text="Olá, você ainda não tem nenhuma lista. Adicione novas listas
            clicando no botão abaixo:"
            />
          }
        />
      </S.ItemsGroup>

      <S.Footer>
        {modal && <CreateListModal />}
        <PlusButton onPress={() => setModal(!modal)} />
      </S.Footer>
    </S.Container>
  );
};
