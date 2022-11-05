import React, { useState, useEffect, useRef } from "react";
import {
  FlatList
} from "react-native";
import * as S from "./styles";
import Item from "../../components/Item";
import { upDateList } from "../../services/ListQueries";
import { useIsFocused } from "@react-navigation/native";
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { createNewItem, getItems } from "../../services/ItemQueries";
import PlusButton from "../../components/PlusButton";
import { UserMessage } from "../../global/global";
import { Search } from "react-native-feather";
import theme from "../../global/theme";
import { AdMobInterstitial } from "expo-ads-admob";

export default () => {
  async function interstitial() {
    await AdMobInterstitial.setAdUnitID(
      "ca-app-pub-8430347978354434~3537975748"
    );
    try {
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
      await AdMobInterstitial.showAdAsync();
    } catch (err) {
      console.log("erro no admob", err);
    } finally {
      AdMobInterstitial.dismissAdAsync();
    }
  }

  const flatlistRef = useRef();
  const {
    currentList,
    currentListName,
    currentItemsRow,
    setCurrentItemsRow,
    updatedList,
    setUpdatedList,
    setScreenName,
  } = useContext(GlobalContext);

  const isFocused = useIsFocused();
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
      await createNewItem(newItem);
      getListItems();
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

    if (searchTerm === ""){
      setCurrentItemsRow(allItems || false);
    } 
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
    if (isFocused) {
      setScreenName("List");
      interstitial();
    }
  }, [isFocused]);

  useEffect(() => {
    searchItems();
  }, [searchTerm]);

  useEffect(() => {
    getListItems();
  }, [updatedList]);

  useEffect(() => {
    editList();
  }, [totalPriceList]);

  function scrollToLastItem() {
    if (currentItemsRow.length > 0) {
      flatlistRef?.current?.scrollToEnd({
        animated: true,
      });
    }
  }

  useEffect(() => {
    scrollToLastItem();
  }, [itemsRow.length]);

  return (
    <>
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

        {currentItemsRow.length > 0 ? (
          <FlatList
            ref={flatlistRef}
            onScrollToIndexFailed={() => {}}
            removeClippedSubviews={false}
            data={currentItemsRow}
            renderItem={(item) => <Item data={item} />}
            keyExtractor={(item) => item.itemID}
          />
        ) : (
          <UserMessage>
            {searchTerm !== ""
              ? "Item não encontrado."
              : "Adicione itens à sua lista."}
          </UserMessage>
        )}
      </S.Container>

      <S.ListFooter>
        <S.ListTotal__wrapper>
          <S.ListTotal__text>Total:</S.ListTotal__text>
          <S.ListTotal__number>
            R${parseFloat(totalPriceList).toFixed(2)}
          </S.ListTotal__number>
        </S.ListTotal__wrapper>

        <PlusButton onPress={addNewItem} Loading={loading} />
      </S.ListFooter>
    </>
  );
};
