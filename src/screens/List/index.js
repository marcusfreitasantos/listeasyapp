import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import * as S from "./styles";
import CreateItemModal from "../../components/CreateItemModal";
import ItemBox from "../../components/ItemBox";
import { upDateListTotal } from "../../services/ListQueries";
import { GlobalContext } from "../../contexts/GlobalContext";
import { getItems } from "../../services/ItemQueries";
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
    currentItemsRow,
    setCurrentItemsRow,
    updatedList,
    isPurchased,
    modal,
    setModal,
  } = useContext(GlobalContext);

  const adUnitId = __DEV__
    ? TestIds.APP_OPEN
    : "ca-app-pub-8430347978354434/6035864738";

  const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  const [totalPriceList, setTotalPriceList] = useState(currentList.listTotal);
  const [itemsRow, setItemsRow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchterm] = useState("");

  let totalPrice = 0;

  async function updateTotalPriceList() {
    const newList = {
      listTotal: totalPrice,
      listID: currentList.listID,
    };
    await upDateListTotal(newList);
  }

  async function getListItems() {
    try {
      const allItems = await getItems(currentList.listID);

      allItems.map((item) => {
        totalPrice += Number(item.itemTotal);
      });

      setTotalPriceList(totalPrice);
      setCurrentItemsRow(allItems);
      setItemsRow(allItems);
      updateTotalPriceList();
    } catch (error) {
      console.log("erro na exibição dos itens:", error);
    } finally {
      setLoading(false);
    }
  }

  function searchItems(term) {
    setSearchterm(term);

    if (term !== "") {
      const newItems = currentItemsRow.filter((item) =>
        item.itemName.toLocaleLowerCase().includes(term.toLocaleLowerCase())
      );
      setItemsRow(newItems);
    } else {
      setItemsRow(currentItemsRow);
    }
  }

  useEffect(() => {
    getListItems();
  }, [modal, updatedList]);

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
              onChangeText={(t) => searchItems(t)}
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
            onScrollToIndexFailed={() => {}}
            removeClippedSubviews={false}
            data={itemsRow}
            renderItem={(item) => <ItemBox data={item} />}
            keyExtractor={(item) => item.itemID}
            ListFooterComponent={<View style={{ height: 200 }} />}
            ListEmptyComponent={
              <EmptyFlatListItem
                text={
                  itemsRow.length
                    ? "Item não encontrado."
                    : "Adicione itens à sua lista."
                }
              />
            }
          />
        )}

        {modal && <CreateItemModal />}
      </Container>

      <S.ListFooter>
        <S.ListTotal__wrapper>
          <S.ListTotal__text>Total:</S.ListTotal__text>
          <S.ListTotal__number>
            R$ {parseFloat(totalPriceList).toFixed(2)}
          </S.ListTotal__number>
        </S.ListTotal__wrapper>

        <PlusButton onPress={() => setModal(!modal)} Loading={loading} />
      </S.ListFooter>
    </>
  );
};
