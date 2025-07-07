import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "@/src/global/theme";
import { Stack } from "expo-router";
import UserContextProvider from "@/src/context/userContext";
import { Header } from "@/src/components/header";

export default function Layout() {
  const colorScheme = useColorScheme();
  const routesToHideHeader = ["index", "signup", "+not-found"];

  return (
    <ThemeProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
      <UserContextProvider>
        <Stack
          screenOptions={{
            header: ({ route }) => {
              if (!routesToHideHeader.includes(route.name.toLowerCase()))
                return <Header />;
            },
          }}
        />
      </UserContextProvider>
    </ThemeProvider>
  );
}
