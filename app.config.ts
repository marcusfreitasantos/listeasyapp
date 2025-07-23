import { ExpoConfig } from "@expo/config";
const runtimeVersion = "4.0.0";

const config: ExpoConfig = {
  name: "List Easy",
  slug: "listeasy",
  version: runtimeVersion,
  orientation: "portrait",
  icon: "./assets/icon.png",
  scheme: "listeasy",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "cover",
    backgroundColor: "#222222",
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    userInterfaceStyle: "automatic",
    edgeToEdgeEnabled: true,
    package: "com.penpack.listeasy",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#222222",
    },
    icon: "./assets/icon.png",
    permissions: ["com.android.vending.BILLING"],
    googleServicesFile: process.env.GOOGLE_SERVICES_FILE,
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/favicon.png",
  },
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
  runtimeVersion: {
    policy: "appVersion",
  },
};

export default config;
