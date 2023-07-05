import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/stacks/MainStack";
import { createListsTable } from "./src/services/ListQueries";
import { createItemsTable } from "./src/services/ItemQueries";
import { InfoProvider } from "./src/contexts/GlobalContext";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import theme from "./src/global/theme";
import darkTheme from "./src/global/darkTheme";
import { ActivityIndicator } from "react-native";
import "expo-dev-client";
import { REVENUECAT_KEY_ANDROID } from "@env";
import Purchases from "react-native-purchases";

import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";

export default function App() {
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_700Bold,
  });

  const colorScheme = useColorScheme();

  useEffect(() => {
    createListsTable();
    createItemsTable();

    Purchases.configure({ apiKey: REVENUECAT_KEY_ANDROID });
  }, []);

  return (
    <NavigationContainer>
      <InfoProvider>
        <StatusBar />
        <ThemeProvider theme={colorScheme === "light" ? theme : darkTheme}>
          {fontsLoaded ? (
            <MainStack />
          ) : (
            <ActivityIndicator style={{ flex: 1 }} />
          )}
        </ThemeProvider>
      </InfoProvider>
    </NavigationContainer>
  );
}
