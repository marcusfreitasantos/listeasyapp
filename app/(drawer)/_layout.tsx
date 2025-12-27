import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Dimensions } from "react-native";
import { Header } from "@/src/components/header";
import { DrawerCustomContent } from "@/src/components/drawerCustomContent";
import { FeatherIconName } from "@/@types/icons";
import { useContext } from "react";
import { GlobalUserContext } from "@/src/context/userContext";
import { useTranslation } from "react-i18next";

export default function Layout() {
  const { t } = useTranslation();
  const { currentUser } = useContext(GlobalUserContext);
  const windowWidth = Dimensions.get("window").width;
  const drawerWidth = (windowWidth * 80) / 100;

  const drawerItems = [
    {
      route: "lists",
      title: t("my_lists"),
      iconName: "list" as FeatherIconName,
      showItem: true,
    },
    {
      route: "profile",
      title: t("profile"),
      iconName: "user" as FeatherIconName,
      showItem: !currentUser?.user.isAnonymous,
    },
    {
      route: "invitations",
      title: t("invitations"),
      iconName: "file-plus" as FeatherIconName,
      showItem: !currentUser?.user.isAnonymous,
    },
    {
      route: "subscriptions",
      title: t("subscriptions"),
      iconName: "credit-card" as FeatherIconName,
      showItem: !currentUser?.user.isAnonymous,
    },
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerStyle: { width: drawerWidth, borderTopEndRadius: 0 },
          header: () => {
            return <Header />;
          },
        }}
        drawerContent={() => (
          <DrawerCustomContent
            items={drawerItems.filter((item) => item.showItem)}
          />
        )}
      />
    </GestureHandlerRootView>
  );
}
