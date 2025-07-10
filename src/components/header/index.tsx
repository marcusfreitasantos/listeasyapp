import Logo from "../logo";
import * as S from "./styles";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

import { useContext } from "react";
import { GlobalUserContext } from "@/src/context/userContext";

export const Header = () => {
  const navigation = useNavigation();
  const { currentUser } = useContext(GlobalUserContext);
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.large.replace("px", ""));

  const openDrawerMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <S.HeaderWrapper>
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
          <S.HeaderUserInfoText>Minhas listas:</S.HeaderUserInfoText>
          <S.HeaderUserInfoTextBold>100</S.HeaderUserInfoTextBold>
        </S.HeaderUserInfoTextRow>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  );
};
