import * as S from "./styles";
import { useContext } from "react";
import { GlobalUserContext } from "@/src/context/userContext";
import { DrawerItem } from "../drawerItem";
import { FeatherIconName } from "@/@types/icons";
import { useLogoutCurrentUser } from "@/src/hooks/useLogoutCurrentUser";
import { LoadingSpinner } from "../loadingSpinner";
import { sendSupportEmail } from "@/src/utils/sendSupportEmail";
import { Button } from "../button";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

type DrawerCustomContentProps = {
  items: {
    route: string;
    title: string;
    iconName: FeatherIconName;
  }[];
};

export const DrawerCustomContent = ({ items }: DrawerCustomContentProps) => {
  const { t } = useTranslation();
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
                      {currentUser?.user.isAnonymous
                        ? "C"
                        : currentUser?.user.displayName?.split("")[0]}
                    </S.DrawerUserInfoAvatarDefaultContent>
                  ) : (
                    <S.DrawerUserInfoAvatarImage
                      source={{ uri: currentUser.user.photoURL }}
                    />
                  )}
                </S.DrawerUserInfoAvatarWrapper>

                <S.DrawerUserInfoTitle numberOfLines={1}>
                  {currentUser?.user.isAnonymous
                    ? t("guest")
                    : currentUser?.user.displayName ?? currentUser?.user.email}
                </S.DrawerUserInfoTitle>

                {currentUser?.user.email && (
                  <S.DrawerUserInfoText numberOfLines={1}>
                    {currentUser?.user.email}
                  </S.DrawerUserInfoText>
                )}
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

              <DrawerItem
                route=""
                title={t("help")}
                iconName="help-circle"
                onPress={sendSupportEmail}
              />
            </S.DrawerItemGroup>

            {currentUser?.user.isAnonymous && (
              <>
                <Button
                  btnText={t("register_for_free")}
                  onPress={() => {
                    router.replace({
                      pathname: "/signup",
                      params: {
                        isAnonymous: "true",
                      },
                    });
                  }}
                />
                <S.DrawerUserInfoText>
                  {t("unlock_all_features")}
                </S.DrawerUserInfoText>
              </>
            )}

            <S.DrawerDivisor />

            <DrawerItem
              route="logout"
              title={t("logout")}
              iconName="log-out"
              onPress={handleLogoutUser}
            />
          </>
        )}
      </S.DrawerContainer>
    </S.DrawerWrapper>
  );
};
