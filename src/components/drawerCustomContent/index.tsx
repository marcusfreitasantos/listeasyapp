import * as S from "./styles";
import { useContext } from "react";
import { GlobalUserContext } from "@/src/context/userContext";
import { DrawerItem } from "../drawerItem";
import { FeatherIconName } from "@/@types/icons";
import { useLogoutCurrentUser } from "@/src/hooks/useLogoutCurrentUser";
import { LoadingSpinner } from "../loadingSpinner";

type DrawerCustomContentProps = {
  items: {
    route: string;
    title: string;
    iconName: FeatherIconName;
  }[];
};

export const DrawerCustomContent = ({ items }: DrawerCustomContentProps) => {
  const { loading, handleLogoutUser } = useLogoutCurrentUser();
  const { currentUser } = useContext(GlobalUserContext);

  return (
    <S.DrawerWrapper>
      <S.DrawerContainer>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
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
                    <DrawerItem
                      key={item.route}
                      route={item.route}
                      title={item.title}
                      iconName={item.iconName}
                    />
                  );
                })}
            </S.DrawerItemGroup>

            <S.DrawerDivisor />

            <DrawerItem
              route="logout"
              title="Sair"
              iconName="log-out"
              onPress={handleLogoutUser}
            />
          </>
        )}
      </S.DrawerContainer>
    </S.DrawerWrapper>
  );
};
