import { Alert, Share } from "react-native";
import { deleteLists } from "../../services/ListQueries";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import * as S from "./styles";
import { Trash2, Share2 } from "react-native-feather";
import theme from "../../global/theme";
import { getItems } from "../../services/ItemQueries";
import PDFTemplateList from "../PDFTemplateList";

export default (item) => {
  const navigation = useNavigation();
  const { setCurrentList, setCurrentListName, setUpdatedList, updatedList } =
    useContext(GlobalContext);
  const total = parseFloat(item.data.item.listTotal);
  const [itemsRow, setItemsRow] = useState([]);

  function editListScreen() {
    navigation.navigate("List");
    setCurrentList(item.data.item);
    setCurrentListName(item.data.item.listName);
  }

  async function getListItems() {
    const allItems = await getItems(item.data.item.listID);
    setItemsRow(allItems);
  }

  useEffect(() => {
    getListItems();
  }, [updatedList]);

  async function removeList() {
    try {
      await deleteLists(item.data.item.listID);
      Alert.alert("Lista removida com sucesso!");
      setUpdatedList(!updatedList);
    } catch (error) {
      Alert.alert("Erro ao remover lista");
      console.log(error);
    }
  }

  function deleteWarning() {
    Alert.alert(
      "ATENÇÃO",
      `A lista '${item.data.item.listName}' será removida.`,
      [
        { text: "Cancelar", onPress: () => console.log("Cancelou") },
        { text: "Confirmar", onPress: () => removeList() },
      ]
    );
  }

  const onShare = async () => {
    try {
      const result = await Share.share(
        {
          message: `${itemsRow.map(
            (item) =>
              "\n" +
              "- " +
              item.itemName +
              (item.itemPrice && " ---------- R$ " + item.itemPrice.toFixed(2))
          )}`,
          title: item.data.item.listName,
        },
        {
          dialogTitle: item.data.item.listName,
        }
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <S.ListBox__wrapper onPress={editListScreen}>
      <S.ListBox__group>
        <S.ListBox__title>{item.data.item.listName}</S.ListBox__title>
        <S.ListBox__total>Total: R$ {total.toFixed(2)}</S.ListBox__total>
      </S.ListBox__group>

      <S.ListBox__groupHorizontal>
        <PDFTemplateList
          listName={item.data.item.listName}
          itemsList={itemsRow}
        />

        <S.ListBox__btn onPress={onShare}>
          <Share2 width={30} color={`${theme.colors.primaryColor}`} />
        </S.ListBox__btn>

        <S.ListBox__btn onPress={deleteWarning}>
          <Trash2 width={30} color={`${theme.colors.atentionColor}`} />
        </S.ListBox__btn>
      </S.ListBox__groupHorizontal>
    </S.ListBox__wrapper>
  );
};
