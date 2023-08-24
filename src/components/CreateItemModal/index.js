import { useState, useContext } from "react";
import { TouchableOpacity } from "react-native";
import * as S from "./styles";
import { GlobalContext } from "../../contexts/GlobalContext";
import ButtonPrimary from "../ButtonPrimary";
import theme from "../../global/theme";
import { createNewItem } from "../../services/ItemQueries";

export default () => {
  const [itemName, setItemName] = useState("");
  const { modal, setModal, currentList } = useContext(GlobalContext);

  async function createNewEmptyItem() {
    try {
      const newEmptyItem = {
        itemName,
        itemPrice: "",
        itemQnt: 1,
        itemTotal: "",
        listID: currentList.listID,
      };

      await createNewItem(newEmptyItem);
    } catch (err) {
      console.log(err);
    } finally {
      setModal(!modal);
    }
  }

  return (
    <S.CreateList__wrapper>
      <S.ListName
        value={itemName}
        onChangeText={(t) => setItemName(t)}
        placeholder="Digite o nome do Item"
        maxLength={20}
        placeholderTextColor={theme.colors.secondaryColor}
        onSubmitEditing={createNewEmptyItem}
        returnKeyType="done"
      />

      <S.CharactersLimitWarning>
        Limite: 20 caracteres.
      </S.CharactersLimitWarning>

      <S.CreateList__group>
        <ButtonPrimary btnText="Criar Item" onPress={createNewEmptyItem} />

        <TouchableOpacity onPress={() => setModal(!modal)}>
          <S.CreateList__cancel>Cancelar</S.CreateList__cancel>
        </TouchableOpacity>
      </S.CreateList__group>
    </S.CreateList__wrapper>
  );
};
