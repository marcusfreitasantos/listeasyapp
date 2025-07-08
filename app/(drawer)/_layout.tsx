import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Dimensions } from "react-native";
import { Header } from "@/src/components/header";
import { DrawerCustomContent } from "@/src/components/drawerCustomContent";

export default function Layout() {
  const windowWidth = Dimensions.get("window").width;
  const drawerWidth = (windowWidth * 80) / 100;

  const drawerItems = [
    {
      route: "/lists",
      title: "Minhas listas",
    },
    {
      route: "/profile",
      title: "Perfil",
    },
    {
      route: "/subscriptions",
      title: "Assinatura",
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
        drawerContent={() => <DrawerCustomContent items={drawerItems} />}
      />
    </GestureHandlerRootView>
  );
}
