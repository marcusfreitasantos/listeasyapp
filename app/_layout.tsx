import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "@/src/global/theme";
import { Stack } from "expo-router";
import UserContextProvider from "@/src/context/userContext";

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
      <UserContextProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </UserContextProvider>
    </ThemeProvider>
  );
}
