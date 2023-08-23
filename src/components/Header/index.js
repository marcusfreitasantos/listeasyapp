import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Edit, DollarSign } from "react-native-feather";
import theme from "../../global/theme";
import * as S from "./styles";

export default ({ routeName }) => {
  const { totalLists, currentListName, setCurrentListName, isPurchased } =
    useContext(GlobalContext);

  const navigation = useNavigation();

  function backToPreviousScreen() {
    navigation.goBack();
  }

  function goToPurchaseScreen() {
    navigation.navigate("PurchaseScreen");
  }

  if (routeName === "MainScreen") {
    return (
      <S.Header__wrapper>
        <S.Header__container>
          <S.Header__logo source={require("../../assets/listeasy-icon.png")} />

          <S.Header__title>
            Minhas Listas {totalLists > 0 && `(${totalLists})`}
          </S.Header__title>

          {!isPurchased && (
            <S.Header__purchaseBtn onPress={goToPurchaseScreen}>
              <DollarSign
                color={`${theme.colors.primaryColorDark}`}
                size={20}
              />
            </S.Header__purchaseBtn>
          )}
        </S.Header__container>
      </S.Header__wrapper>
    );
  } else if (routeName === "PurchaseScreen") {
    return (
      <S.Header__wrapper>
        <S.Header__container>
          <S.Header__backBtn onPress={backToPreviousScreen}>
            <ArrowLeft color={`${theme.colors.primaryColor}`} size={20} />
            <S.Header__title>Voltar </S.Header__title>
          </S.Header__backBtn>
        </S.Header__container>
      </S.Header__wrapper>
    );
  } else if (routeName === "List") {
    return (
      <S.Header__wrapper>
        <S.Header__container>
          <S.Header__backBtn onPress={backToPreviousScreen}>
            <ArrowLeft color={`${theme.colors.primaryColor}`} size={20} />
            <S.Header__title>Voltar </S.Header__title>
          </S.Header__backBtn>

          <S.ListName>
            <S.ListNameInput
              maxLength={20}
              value={currentListName}
              onChangeText={(t) => setCurrentListName(t)}
            />

            <Edit
              width={24}
              height={24}
              color={`${theme.colors.secondaryColor}`}
            />
          </S.ListName>

          {!isPurchased && (
            <S.Header__purchaseBtn onPress={goToPurchaseScreen}>
              <DollarSign
                color={`${theme.colors.primaryColorDark}`}
                size={20}
              />
            </S.Header__purchaseBtn>
          )}
        </S.Header__container>
      </S.Header__wrapper>
    );
  } else {
    return null;
  }
};
