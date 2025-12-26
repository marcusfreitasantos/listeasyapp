import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Dimensions } from "react-native";
import { Header } from "@/src/components/header";
import { DrawerCustomContent } from "@/src/components/drawerCustomContent";
import { FeatherIconName } from "@/@types/icons";
import { useContext } from "react";
import { GlobalUserContext } from "@/src/context/userContext";

export default function Layout() {
  const { currentUser } = useContext(GlobalUserContext);
  const windowWidth = Dimensions.get("window").width;
  const drawerWidth = (windowWidth * 80) / 100;

  const drawerItems = [
    {
      route: "lists",
      title: "Minhas listas",
      iconName: "list" as FeatherIconName,
      showItem: true,
    },
    {
      route: "profile",
      title: "Perfil",
      iconName: "user" as FeatherIconName,
      showItem: !currentUser?.user.isAnonymous,
    },
    {
      route: "invitations",
      title: "Convites",
      iconName: "file-plus" as FeatherIconName,
      showItem: !currentUser?.user.isAnonymous,
    },
    {
      route: "subscriptions",
      title: "Planos",
      iconName: "credit-card" as FeatherIconName,
      showItem: true,
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
