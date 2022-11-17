import React from "react";
import * as S from "./styles";
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Edit } from "react-native-feather";
import theme from "../../global/theme";
import { AdMobBanner } from "expo-ads-admob";

export default () => {
  const {
    screenName,
    totalLists,
    currentListName,
    setCurrentListName,
    isPurchased,
    setIsPurchased,
  } = useContext(GlobalContext);
  const navigation = useNavigation();

  function backToPreviousScreen() {
    navigation.goBack();
  }

  return (
    <>
      <S.Header__wrapper>
        <S.Header__container>
          {screenName === "MainScreen" ? (
            <>
              <S.Header__logo
                source={require("../../assets/listeasy-icon.png")}
              />
              <S.Header__title>
                {" "}
                Minhas Listas {totalLists > 0 && `(${totalLists})`}{" "}
              </S.Header__title>
            </>
          ) : (
            <>
              <S.Header__backBtn onPress={backToPreviousScreen}>
                <ArrowLeft color={`${theme.colors.primaryColor}`} size={20} />
                <S.Header__title>Voltar </S.Header__title>
              </S.Header__backBtn>

              <S.ListName>
                <S.ListNameInput
                  value={currentListName}
                  onChangeText={(t) => setCurrentListName(t)}
                />

                <Edit
                  width={24}
                  height={24}
                  color={`${theme.colors.secondaryColor}`}
                />
              </S.ListName>
            </>
          )}
        </S.Header__container>
      </S.Header__wrapper>

      {!isPurchased && (
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-8430347978354434/3994109034"
          servePersonalizedAds
          onDidFailToReceiveAdWithError={this.bannerError}
        />
      )}
    </>
  );
};
