import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/stacks/MainStack";
import { createListsTable } from "./src/services/ListQueries";
import { createItemsTable } from "./src/services/ItemQueries";
import { InfoProvider } from "./src/contexts/GlobalContext";
import Header from "./src/components/Header";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import theme from "./src/global/theme";
import darkTheme from "./src/global/darkTheme";
import { useColorScheme } from "react-native";

export default function App() {
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
          <Header />
          <MainStack />
        </ThemeProvider>
      </InfoProvider>
    </NavigationContainer>
  );
}
