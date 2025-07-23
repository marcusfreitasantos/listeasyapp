import { useContext, useRef } from "react";
import { Platform } from "react-native";
import * as S from "./styles";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { GlobalListContext } from "@/src/context/listContext";
import { GlobalUserContext } from "@/src/context/userContext";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useForeground,
} from "react-native-google-mobile-ads";

export const Header = () => {
  const navigation = useNavigation();
  const { currentUser } = useContext(GlobalUserContext);
  const { listsLength } = useContext(GlobalListContext);
  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : "ca-app-pub-8430347978354434/3994109034";
  const bannerRef = useRef<BannerAd>(null);

  useForeground(() => {
    Platform.OS === "ios" && bannerRef.current?.load();
  });

  const openDrawerMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <S.HeaderWrapper>
      <BannerAd
        ref={bannerRef}
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />

      <S.HeaderContainer>
        {currentUser && (
          <S.HeaderUserInfo onPress={openDrawerMenu}>
            <S.HeaderUserInfoAvatarWrapper>
              {!currentUser.user.photoURL ? (
                <S.HeaderUserInfoAvatarDefaultContent>
                  {currentUser?.user.displayName?.split("")[0]}
                </S.HeaderUserInfoAvatarDefaultContent>
              ) : (
                <S.HeaderUserInfoAvatarImage
                  source={{ uri: currentUser.user.photoURL }}
                />
              )}
            </S.HeaderUserInfoAvatarWrapper>

            <S.HeaderUserInfoTitle numberOfLines={1}>
              {currentUser?.user.displayName ?? currentUser?.user.email}
            </S.HeaderUserInfoTitle>
          </S.HeaderUserInfo>
        )}

        <S.HeaderUserInfoTextRow>
          <S.HeaderUserInfoText>Minhas listas: </S.HeaderUserInfoText>
          <S.HeaderUserInfoTextBold>{listsLength}</S.HeaderUserInfoTextBold>
        </S.HeaderUserInfoTextRow>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  );
};
