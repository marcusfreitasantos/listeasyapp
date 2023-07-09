import { useState, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { createNewList, getLists } from "../../services/ListQueries";
import * as S from "./styles";
import { GlobalContext } from "../../contexts/GlobalContext";
import ButtonPrimary from "../ButtonPrimary";
import theme from "../../global/theme";

export default () => {
  const [listName, setListName] = useState("");
  const { modal, setModal, setTotalLists } = useContext(GlobalContext);

  async function createList() {
    const newList = {
      listName: listName,
      listTotal: 0,
    };
    await createNewList(newList);
    setModal(false);
    showLists();
  }

  async function showLists() {
    const allLists = await getLists();
    setTotalLists(allLists.length);
  }

  return (
    <S.CreateList__wrapper>
      <S.ListName
        value={listName}
        onChangeText={(t) => setListName(t)}
        placeholder="Digite o nome da lista"
        maxLength={15}
        placeholderTextColor={theme.colors.secondaryColor}
        onSubmitEditing={createList}
        returnKeyType="done"
      />

      <S.CharactersLimitWarning>
        Limite: 15 caracteres.
      </S.CharactersLimitWarning>

      <S.CreateList__group>
        <ButtonPrimary btnText="Criar Lista" onPress={createList} />

        <TouchableOpacity onPress={() => setModal(!modal)}>
          <S.CreateList__cancel>Cancelar</S.CreateList__cancel>
        </TouchableOpacity>
      </S.CreateList__group>
    </S.CreateList__wrapper>
  );
};
