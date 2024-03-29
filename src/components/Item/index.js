import React, { useState } from "react";
import { Alert } from "react-native";
import * as S from "./styles";
import { deleteItem, upDateItem } from "../../services/ItemQueries";
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Trash2, Plus, Minus } from "react-native-feather";
import theme from "../../global/theme";
import Animated, { FadeInUp } from "react-native-reanimated";

export default (item) => {
  const currentItem = item.data.item;
  const [itemName, setItemName] = useState(currentItem.itemName || "");
  const [itemPrice, setItemPrice] = useState(
    currentItem.itemPrice.toString() || ""
  );
  const [itemQuantity, setItemQuantity] = useState(currentItem.itemQnt);
  const itemTotal = itemPrice * itemQuantity;
  const { updatedList, setUpdatedList } = useContext(GlobalContext);

  async function deleteItemById() {
    setUpdatedList(!updatedList);

    const response = await deleteItem(currentItem.itemID);
    if (response) {
      Alert.alert("Item removido com sucesso!");
    }
  }

  function deleteWarning() {
    Alert.alert("ATENÇÃO", `O item será removido.`, [
      { text: "Cancelar", onPress: () => console.log("Cancelou") },
      { text: "Confirmar", onPress: () => deleteItemById() },
    ]);
  }

  async function updateItemById() {
    const updatedItem = {
      itemName: itemName,
      itemPrice: itemPrice,
      itemQnt: itemQuantity,
      itemTotal: itemTotal,
      itemID: currentItem.itemID,
    };
    await upDateItem(updatedItem);
    setUpdatedList(!updatedList);
  }

  function increaseItemQuant() {
    setItemQuantity(itemQuantity + 1);
  }

  function decreaseItemQuant() {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
    } else {
      setItemQuantity(1);
    }
  }

  function handleChangePrice(price) {
    const formatedPrice = price
      .replace(/[- #*+;<>\{\}\[\]\\\/]/gi, "")
      .replace(",", ".");

    setItemPrice(formatedPrice);
  }

  return (
    <Animated.View entering={FadeInUp}>
      <S.Item__wrapper>
        <S.Item__group>
          <S.Item__name>
            <S.Item__nameInput
              value={itemName}
              placeholder="Nome do produto"
              placeholderTextColor={theme.colors.secondaryColor}
              onChangeText={(t) => setItemName(t)}
            />
          </S.Item__name>

          <S.Item__price>
            <S.DolarSign>R$</S.DolarSign>
            <S.Item__priceInput
              keyboardType="decimal-pad"
              value={itemPrice}
              placeholder="0.00"
              placeholderTextColor={theme.colors.secondaryColor}
              onChangeText={(t) => handleChangePrice(t)}
            />
          </S.Item__price>
        </S.Item__group>

        <S.Item__group>
          <S.Item__delete onPress={deleteWarning}>
            <Trash2
              color={`${theme.colors.lightColor}`}
              width={16}
              height={16}
            />
            <S.Item__btnText>Remover item</S.Item__btnText>
          </S.Item__delete>

          <S.Item__quant>
            <S.Item__quantBtn
              onPress={decreaseItemQuant}
              disabled={itemQuantity <= 1 ? true : false}
            >
              <Minus
                color={theme.colors.secondaryColorDark}
                width={20}
                height={20}
              />
            </S.Item__quantBtn>

            <S.Item__quantNumber>{itemQuantity}</S.Item__quantNumber>

            <S.Item__quantBtn onPress={increaseItemQuant}>
              <Plus
                color={theme.colors.secondaryColorDark}
                width={20}
                height={20}
              />
            </S.Item__quantBtn>
          </S.Item__quant>
        </S.Item__group>

        <S.Item__confirm onPress={updateItemById}>
          <S.Item__btnText>Atualizar</S.Item__btnText>
        </S.Item__confirm>
      </S.Item__wrapper>
    </Animated.View>
  );
};
