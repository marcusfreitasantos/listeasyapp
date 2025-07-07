import Logo from "../logo";
import * as S from "./styles";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";

import { useContext } from "react";
import { GlobalUserContext } from "@/src/context/userContext";

export const Header = () => {
  const { currentUser } = useContext(GlobalUserContext);
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.large.replace("px", ""));

  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <S.HeaderUserInfo>
          <S.HeaderUserInfoAvatarWrapper>
            <S.HeaderUserInfoAvatarDefaultContent>
              {currentUser?.user.displayName?.split("")[0]}
            </S.HeaderUserInfoAvatarDefaultContent>
          </S.HeaderUserInfoAvatarWrapper>

          <S.HeaderUserInfoTitle numberOfLines={1}>
            {currentUser?.user.displayName ?? currentUser?.user.email}
          </S.HeaderUserInfoTitle>
        </S.HeaderUserInfo>

        <S.HeaderUserInfoText>Minhas listas: 100</S.HeaderUserInfoText>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  );
};
