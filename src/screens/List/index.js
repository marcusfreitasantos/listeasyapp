import React, { useState, useEffect, useRef } from "react";
import { FlatList } from "react-native";
import * as S from "./styles";
import Item from "../../components/Item";
import { upDateList } from "../../services/ListQueries";
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { createNewItem, getItems } from "../../services/ItemQueries";
import PlusButton from "../../components/PlusButton";
import { Search } from "react-native-feather";
import theme from "../../global/theme";
import EmptyFlatListItem from "../../components/EmptyFlatListItem";
//import { AdMobInterstitial } from "expo-ads-admob";
import Header from "../../components/Header";

export default ({ route }) => {
  async function interstitial() {
    console.log("ads");
    // await AdMobInterstitial.setAdUnitID(
    //   "ca-app-pub-8430347978354434/6035864738"
    // );
    // try {
    //   await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    //   await AdMobInterstitial.showAdAsync();
    // } catch (err) {
    //   console.log("erro no admob", err);
    // } finally {
    //   AdMobInterstitial.dismissAdAsync();
    // }
  }

  const flatlistRef = useRef();
  const {
    currentList,
    currentListName,
    currentItemsRow,
    setCurrentItemsRow,
    updatedList,
    setUpdatedList,
    isPurchased,
  } = useContext(GlobalContext);

  const [firstRender, setFirstRender] = useState(true);
  const [totalPriceList, setTotalPriceList] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsRow, setItemsRow] = useState([]);
  const [loading, setLoading] = useState(false);

  let totalPrice = 0;

  async function editList() {
    const newList = {
      listName: currentListName,
      listTotal: totalPriceList,
      listID: currentList.listID,
    };
    await upDateList(newList);
    setUpdatedList(!updatedList);
  }

  function scrollToLastItem() {
    if (currentItemsRow.length > 0) {
      flatlistRef?.current?.scrollToEnd({
        animated: true,
      });
    }
  }

  async function addNewItem() {
    setLoading(true);
    try {
      const newItem = {
        itemName: "",
        itemPrice: "",
        itemQnt: 1,
        itemTotal: "",
        listID: currentList.listID,
      };

      const newItemAdded = await createNewItem(newItem);

      if (newItemAdded) {
        getListItems();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function getListItems() {
    const allItems = await getItems(currentList.listID);

    allItems.map((item) => {
      totalPrice += item.itemTotal;
    });

    setTotalPriceList(totalPrice);
    setCurrentItemsRow(allItems);
    setItemsRow(allItems);
  }

  function searchItems() {
    if (searchTerm !== "") {
      const newItems = currentItemsRow.filter((item) =>
        item.itemName
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase())
      );
      setCurrentItemsRow(newItems);
    } else {
      setCurrentItemsRow(itemsRow);
    }
  }

  useEffect(() => {
    if (firstRender) {
      setFirstRender(!firstRender);
    } else {
      editList();
    }
  }, [currentListName]);

  useEffect(() => {
    searchItems();
  }, [searchTerm]);

  useEffect(() => {
    getListItems();
  }, [updatedList]);

  useEffect(() => {
    editList();
  }, [totalPriceList]);

  useEffect(() => {
    scrollToLastItem();
  }, [currentItemsRow.length]);

  return (
    <>
      <Header routeName={route.name} />
      <S.Container>
        <S.List__header>
          <S.SearchItemWrapper>
            <S.SearchItemInput
              value={searchTerm}
              onChangeText={(t) => setSearchTerm(t)}
              placeholder="Pesquisar itens"
              placeholderTextColor={theme.colors.secondaryColor}
            />

            <Search
              width={24}
              height={24}
              color={`${theme.colors.secondaryColor}`}
            />
          </S.SearchItemWrapper>
        </S.List__header>

        <FlatList
          ref={flatlistRef}
          onScrollToIndexFailed={() => {}}
          removeClippedSubviews={false}
          data={currentItemsRow}
          renderItem={(item) => <Item data={item} />}
          keyExtractor={(item) => item.itemID}
          ListEmptyComponent={
            <EmptyFlatListItem
              text={
                searchTerm !== ""
                  ? "Item não encontrado."
                  : "Adicione itens à sua lista."
              }
            />
          }
        />
      </S.Container>

      <S.ListFooter>
        <S.ListTotal__wrapper>
          <S.ListTotal__text>Total:</S.ListTotal__text>
          <S.ListTotal__number>
            R$ {parseFloat(totalPriceList).toFixed(2)}
          </S.ListTotal__number>
        </S.ListTotal__wrapper>

        <PlusButton onPress={addNewItem} Loading={loading} />
      </S.ListFooter>
    </>
  );
};
