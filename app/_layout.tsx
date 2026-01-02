import { ThemeProvider } from "styled-components/native";
import { darkTheme } from "@/src/global/theme";
import { Stack } from "expo-router";
import MainContextProvider from "@/src/context/mainContextProvider";
import mobileAds from "react-native-google-mobile-ads";
import "@/src/i18n";

export default function Layout() {
  mobileAds()
    .initialize()
    .then((adapterStatuses) => {
      console.log("Mobile Ads initialized:", adapterStatuses);
    });

  return (
    <ThemeProvider theme={darkTheme}>
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
