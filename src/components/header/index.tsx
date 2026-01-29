import { useContext, useRef } from "react";
import { Platform } from "react-native";
import * as S from "./styles";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { GlobalListContext } from "@/src/context/listContext";
import { GlobalUserContext } from "@/src/context/userContext";
import { GlobalSubscriptionContext } from "@/src/context/subscriptionContext";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useForeground,
} from "react-native-google-mobile-ads";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { currentUser } = useContext(GlobalUserContext);
  const { listsLength } = useContext(GlobalListContext);
  const { currentSubscription } = useContext(GlobalSubscriptionContext);
  const admobPubId =
    Platform.OS === "android"
      ? "ca-app-pub-8430347978354434/3994109034"
      : "ca-app-pub-8430347978354434/4815161567";
  const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : admobPubId;
  const bannerRef = useRef<BannerAd>(null);

  useForeground(() => {
    Platform.OS === "ios" && bannerRef.current?.load();
  });

  const openDrawerMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <S.HeaderWrapper>
      {(!currentSubscription || currentSubscription.status !== "active") && (
        <BannerAd
          ref={bannerRef}
          unitId={adUnitId}
          size={BannerAdSize.LEADERBOARD}
        />
      )}

      <S.HeaderContainer>
        {currentUser && (
          <S.HeaderUserInfo onPress={openDrawerMenu}>
            <S.HeaderUserInfoAvatarWrapper>
              {!currentUser.user.photoURL ? (
                <S.HeaderUserInfoAvatarDefaultContent>
                  {currentUser.user.isAnonymous
                    ? t("guest").split("")[0]
                    : currentUser?.user.displayName?.split("")[0]}
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
          <S.HeaderUserInfoText>{t("my_lists")}: </S.HeaderUserInfoText>
          <S.HeaderUserInfoTextBold>{listsLength}</S.HeaderUserInfoTextBold>
        </S.HeaderUserInfoTextRow>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  );
};
