import React, { useState, useEffect, useRef, useContext } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import * as S from "./styles";
import Item from "../../components/Item";
import { upDateList } from "../../services/ListQueries";
import { GlobalContext } from "../../contexts/GlobalContext";
import { createNewItem, getItems } from "../../services/ItemQueries";
import PlusButton from "../../components/PlusButton";
import { Search } from "react-native-feather";
import theme from "../../global/theme";
import EmptyFlatListItem from "../../components/EmptyFlatListItem";
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

import Header from "../../components/Header";
import Container from "../../components/Container";

export default ({ route }) => {
  const {
    currentList,
    currentListName,
    currentItemsRow,
    setCurrentItemsRow,
    updatedList,
    setUpdatedList,
    isPurchased,
  } = useContext(GlobalContext);

  const adUnitId = __DEV__
    ? TestIds.APP_OPEN
    : "ca-app-pub-8430347978354434/6035864738";

  const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  const flatlistRef = useRef();

  const [totalPriceList, setTotalPriceList] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsRow, setItemsRow] = useState([]);
  const [loading, setLoading] = useState(true);

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
    }
  }

  async function getListItems() {
    try {
      const allItems = await getItems(currentList.listID);

      allItems.map((item) => {
        totalPrice += item.itemTotal;
      });

      setTotalPriceList(totalPrice);
      setCurrentItemsRow(allItems);
      setItemsRow(allItems);
    } catch (error) {
      console.log("erro na exibição dos itens:", error);
    } finally {
      setLoading(false);
    }
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
    editList();
  }, [currentListName, totalPriceList]);

  useEffect(() => {
    searchItems();
  }, [searchTerm]);

  useEffect(() => {
    getListItems();
  }, [updatedList]);

  useEffect(() => {
    scrollToLastItem();
  }, [currentItemsRow.length]);

  useEffect(() => {
    if (!isPurchased) {
      const unsubscribe = interstitial.addAdEventListener(
        AdEventType.LOADED,
        () => {
          interstitial.show();
        }
      );

      interstitial.load();

      return unsubscribe;
    }
  }, []);

  return (
    <>
      <Header routeName={route.name} />
      <Container>
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

        {loading ? (
          <ActivityIndicator
            color={theme.colors.primaryColor}
            style={{ flex: 1 }}
          />
        ) : (
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
        )}
      </Container>

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
