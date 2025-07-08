import { Link } from "expo-router";
import * as S from "./styles";
import { useContext } from "react";
import { GlobalUserContext } from "@/src/context/userContext";

type DrawerCustomContentProps = {
  items: {
    route: string;
    title: string;
  }[];
};

export const DrawerCustomContent = ({ items }: DrawerCustomContentProps) => {
  const { currentUser } = useContext(GlobalUserContext);

  return (
    <S.DrawerWrapper>
      <S.DrawerContainer>
        <S.DrawerItemGroup>
          <S.DrawerUserInfo>
            <S.DrawerUserInfoAvatarWrapper>
              {!currentUser?.user.photoURL ? (
                <S.DrawerUserInfoAvatarDefaultContent>
                  {currentUser?.user.displayName?.split("")[0]}
                </S.DrawerUserInfoAvatarDefaultContent>
              ) : (
                <S.DrawerUserInfoAvatarImage
                  source={{ uri: currentUser.user.photoURL }}
                />
              )}
            </S.DrawerUserInfoAvatarWrapper>

            <S.DrawerUserInfoTitle numberOfLines={1}>
              {currentUser?.user.displayName ?? currentUser?.user.email}
            </S.DrawerUserInfoTitle>

            <S.DrawerUserInfoText numberOfLines={1}>
              {currentUser?.user.email}
            </S.DrawerUserInfoText>
          </S.DrawerUserInfo>

          <S.DrawerDivisor />

          {items &&
            items.map((item) => {
              return (
                <Link
                  key={item.route}
                  href={item.route as any}
                  asChild
                  dismissTo
                >
                  <S.DrawerItem>
                    <S.DrawerItemText>{item.title}</S.DrawerItemText>
                  </S.DrawerItem>
                </Link>
              );
            })}
        </S.DrawerItemGroup>

        <S.DrawerDivisor />

        <S.DrawerItem>
          <S.DrawerItemText>Sair</S.DrawerItemText>
        </S.DrawerItem>
      </S.DrawerContainer>
    </S.DrawerWrapper>
  );
};
