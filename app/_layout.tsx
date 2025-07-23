import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "@/src/global/theme";
import { Stack } from "expo-router";
import UserContextProvider from "@/src/context/userContext";
import ListContextProvider from "@/src/context/listContext";
import mobileAds from "react-native-google-mobile-ads";

export default function Layout() {
  const colorScheme = useColorScheme();

  mobileAds()
    .initialize()
    .then((adapterStatuses) => {
      console.log("Mobile Ads initialized:", adapterStatuses);
    });

  return (
    <ThemeProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
      <UserContextProvider>
        <ListContextProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </ListContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  );
}
