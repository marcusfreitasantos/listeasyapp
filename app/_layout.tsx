import { useEffect, useState } from "react";
import { useColorScheme, ActivityIndicator } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "@/src/global/theme";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function RootLayout() {
  const [loaded] = useFonts({
    OpenSansLight: require("@/assets/fonts/OpenSans-Light.ttf"),
    OpenSansRegular: require("@/assets/fonts/OpenSans-Regular.ttf"),
    OpenSansSemiBold: require("@/assets/fonts/OpenSans-SemiBold.ttf"),
    OpenSansBold: require("@/assets/fonts/OpenSans-Bold.ttf"),
  });
  const [appIsReady, setAppIsReady] = useState(false);

  const colorScheme = useColorScheme();

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }, 2000);
    }
  }, [loaded]);

  if (!appIsReady) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <ThemeProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
