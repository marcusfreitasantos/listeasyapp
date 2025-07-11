import { useContext } from "react";
import * as S from "./styles";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { GlobalListContext } from "@/src/context/listContext";
import { GlobalUserContext } from "@/src/context/userContext";

export const Header = () => {
  const navigation = useNavigation();
  const { currentUser } = useContext(GlobalUserContext);
  const { listsLength } = useContext(GlobalListContext);

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
          <S.HeaderUserInfoText>Minhas listas: </S.HeaderUserInfoText>
          <S.HeaderUserInfoTextBold>{listsLength}</S.HeaderUserInfoTextBold>
        </S.HeaderUserInfoTextRow>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  );
};
