import { ExpoConfig } from "@expo/config";
const runtimeVersion = "4.0.5";
const bgColor = "#222222";

const config: ExpoConfig = {
  name: "List Easy",
  slug: "listeasy",
  version: runtimeVersion,
  orientation: "default",
  icon: "./assets/icon.png",
  scheme: "listeasy",
  userInterfaceStyle: "automatic",
  ios: {
    supportsTablet: true,
  },
  android: {
    userInterfaceStyle: "automatic",
    edgeToEdgeEnabled: true,
    package: "com.penpack.listeasy",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: bgColor,
    },
    icon: "./assets/icon.png",
    googleServicesFile: process.env.GOOGLE_SERVICES_FILE,
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/favicon.png",
  },
  platforms: ["android", "ios"],
  plugins: [
    [
      "react-native-google-mobile-ads",
      {
        androidAppId: process.env.GOOGLE_ADMOB_ANDROID_APP_ID,
        iosAppId: process.env.GOOGLE_ADMOB_IOS_APP_ID,
      },
    ],
    "@react-native-firebase/app",
    "@react-native-firebase/crashlytics",
    "@react-native-firebase/perf",
    [
      "expo-build-properties",
      {
        android: {
          enableProguardInReleaseBuilds: true,
          enableShrinkResourcesInReleaseBuilds: true,
        },
      },
    ],
    "expo-router",
    [
      "expo-font",
      {
        android: {
          fonts: ["./assets/fonts/NunitoSans.ttf"],
        },
        ios: {
          fonts: ["./assets/fonts/NunitoSans.ttf"],
        },
      },
    ],
    [
      "expo-image-picker",
      {
        photosPermission:
          "O List Easy precisa acessar sua galeria para armazenar sua foto de perfil",
        cameraPermission:
          "O List Easy precisa acessar sua câmera para armazenar sua foto de perfil",
      },
    ],
    [
      "expo-splash-screen",
      {
        image: "./assets/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: bgColor,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "021d95ea-9341-4a16-bed5-85eeacc48547",
    },
  },
  owner: "marcusfreitas",
  updates: {
    enabled: true,
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/021d95ea-9341-4a16-bed5-85eeacc48547",
    requestHeaders: {
      "runtime-version": runtimeVersion,
      "channel-name": "production",
    },
  },
  runtimeVersion: {
    policy: "appVersion",
  },
};

export default config;
