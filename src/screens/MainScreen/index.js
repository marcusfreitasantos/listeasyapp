import { useEffect } from "react";
import { FlatList } from "react-native";
import ListBox from "../../components/ListBox";
import * as S from "./styles";
import CreateListModal from "../../components/CreateListModal";
import { getLists } from "../../services/ListQueries";
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useNavigation } from "@react-navigation/native";
import PlusButton from "../../components/PlusButton";
import EmptyFlatListItem from "../../components/EmptyFlatListItem";
import Header from "../../components/Header";

export default ({ route }) => {
  const navigation = useNavigation();

  const {
    totalLists,
    setTotalLists,
    userLists,
    setUserLists,
    updatedList,
    modal,
    setModal,
    isPurchased,
  } = useContext(GlobalContext);

  async function showLists() {
    const allLists = await getLists();
    setTotalLists(allLists.length);
    setUserLists(allLists);
  }

  useEffect(() => {
    showLists();
  }, [updatedList]);

  function handleListCreation() {
    if (!isPurchased && totalLists >= 1) {
      navigation.navigate("PurchaseScreen");
    } else {
      setModal(!modal);
    }
  }

  return (
    <>
      <Header routeName={route.name} />
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
          <PlusButton onPress={handleListCreation} />
        </S.Footer>
      </S.Container>
    </>
  );
};
