import { useEffect } from "react";
import { useColorScheme, ActivityIndicator, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/stacks/MainStack";
import { createListsTable } from "./src/services/ListQueries";
import { createItemsTable } from "./src/services/ItemQueries";
import { InfoProvider } from "./src/contexts/GlobalContext";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/global/theme";
import darkTheme from "./src/global/darkTheme";

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
