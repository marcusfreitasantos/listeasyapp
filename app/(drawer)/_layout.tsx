import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Dimensions } from "react-native";
import { Header } from "@/src/components/header";
import { DrawerCustomContent } from "@/src/components/drawerCustomContent";

export default function Layout() {
  const windowWidth = Dimensions.get("window").width;
  const drawerWidth = (windowWidth * 80) / 100;

  const drawerMenuOptions = [
    {
      name: "/company",
      title: "Início",
    },
    {
      name: "/company/vacancies",
      title: "Vagas",
    },
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerStyle: { width: drawerWidth },
          header: () => {
            return <Header />;
          },
        }}
        drawerContent={() => <DrawerCustomContent />}
      />
    </GestureHandlerRootView>
  );
}
