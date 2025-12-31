import { ExpoConfig } from "@expo/config";
const appVersion = "4.1.3";
const bgColor = "#222222";
const isLocal = process.env.APP_ENV === "local";

const config: ExpoConfig = {
  name: "List Easy",
  slug: "listeasy",
  version: appVersion,
  runtimeVersion: {
    policy: "appVersion",
  },
  icon: "./assets/icon.png",
  scheme: "listeasy",
  userInterfaceStyle: "automatic",
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.penpack.listeasy",
    googleServicesFile: isLocal
      ? "./google-services.plist"
      : process.env.GOOGLE_SERVICES_FILE_IOS,
    infoPlist: {
      NSPhotoLibraryUsageDescription:
        "O List Easy precisa acessar sua galeria para armazenar sua foto de perfil",
      NSCameraUsageDescription:
        "O List Easy precisa acessar sua câmera para armazenar sua foto de perfil",
      ITSAppUsesNonExemptEncryption: false,
      LSApplicationQueriesSchemes: ["mailto"],
    },
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
    googleServicesFile: isLocal
      ? "./google-services.json"
      : process.env.GOOGLE_SERVICES_FILE_ANDROID,
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/favicon.png",
  },
  platforms: ["android", "ios"],
  plugins: [
    [
      "expo-localization",
      {
        supportedLocales: {
          ios: ["en", "pt-BR"],
          android: ["en", "pt-BR"],
        },
      },
    ],
    [
      "react-native-google-mobile-ads",
      {
        androidAppId: "ca-app-pub-8430347978354434~3537975748",
        iosAppId: "ca-app-pub-8430347978354434~7756185527",
        skAdNetworkItems: [
          "cstr6suwn9.skadnetwork",
          "4fzdc2evr5.skadnetwork",
          "2fnua5tdw4.skadnetwork",
          "ydx93a7ass.skadnetwork",
          "p78axxw29g.skadnetwork",
          "v72qych5uu.skadnetwork",
          "ludvb6z3bs.skadnetwork",
          "cp8zw746q7.skadnetwork",
          "3sh42y64q3.skadnetwork",
          "c6k4g5qg8m.skadnetwork",
          "s39g8k73mm.skadnetwork",
          "3qy4746246.skadnetwork",
          "f38h382jlk.skadnetwork",
          "hs6bdukanm.skadnetwork",
          "mlmmfzh3r3.skadnetwork",
          "v4nxqhlyqp.skadnetwork",
          "wzmmz9fp6w.skadnetwork",
          "su67r6k2v3.skadnetwork",
          "yclnxrl5pm.skadnetwork",
          "t38b2kh725.skadnetwork",
          "7ug5zh24hu.skadnetwork",
          "gta9lk7p23.skadnetwork",
          "vutu7akeur.skadnetwork",
          "y5ghdn5j9k.skadnetwork",
          "v9wttpbfk9.skadnetwork",
          "n38lu8286q.skadnetwork",
          "47vhws6wlr.skadnetwork",
          "kbd757ywx3.skadnetwork",
          "9t245vhmpl.skadnetwork",
          "a2p9lx4jpn.skadnetwork",
          "22mmun2rn5.skadnetwork",
          "44jx6755aq.skadnetwork",
          "k674qkevps.skadnetwork",
          "4468km3ulz.skadnetwork",
          "2u9pt9hc89.skadnetwork",
          "8s468mfl3y.skadnetwork",
          "klf5c3l5u5.skadnetwork",
          "ppxm28t8ap.skadnetwork",
          "kbmxgpxpgc.skadnetwork",
          "uw77j35x4d.skadnetwork",
          "578prtvx9j.skadnetwork",
          "4dzt52r2t5.skadnetwork",
          "tl55sbb4fm.skadnetwork",
          "c3frkrj4fj.skadnetwork",
          "e5fvkxwrpn.skadnetwork",
          "8c4e2ghe7u.skadnetwork",
          "3rd42ekr43.skadnetwork",
          "97r2b46745.skadnetwork",
          "3qcr597p9d.skadnetwork",
        ],
      },
    ],
    "@react-native-firebase/app",
    "@react-native-firebase/crashlytics",
    "@react-native-firebase/perf",
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
        },
        android: {
          enableProguardInReleaseBuilds: true,
          enableShrinkResourcesInReleaseBuilds: true,
          kotlinVersion: "2.1.20",
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
    "expo-iap",
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
    listEasyApiKey: process.env.LIST_EASY_API_KEY,
  },
  owner: "marcusfreitas",
  updates: {
    enabled: true,
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/021d95ea-9341-4a16-bed5-85eeacc48547",
  },
};

export default config;
