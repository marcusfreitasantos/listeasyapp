import { useColorScheme } from "react-native";
import { useEffect } from "react";
import * as Updates from "expo-updates";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "@/src/global/theme";
import { Stack } from "expo-router";
import MainContextProvider from "@/src/context/mainContextProvider";
import mobileAds from "react-native-google-mobile-ads";
import "@/src/i18n";
import { checkInternetConnection } from "@/src/utils/checkInternetConnection";

export default function Layout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  const onFetchUpdateAsync = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.log(`Error fetching latest Expo update: ${error}`);
    }
  };

  const checkConnectionThenFetchUpdate = async () => {
    try {
      await checkInternetConnection();
      await onFetchUpdateAsync();
    } catch (error) {
      console.error(
        "Error checking internet connection or fetching update:",
        error,
      );
    }
  };

  mobileAds()
    .initialize()
    .then((adapterStatuses) => {
      console.log("Mobile Ads initialized:", adapterStatuses);
    });

  useEffect(() => {
    checkConnectionThenFetchUpdate();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <MainContextProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </MainContextProvider>
    </ThemeProvider>
  );
}
