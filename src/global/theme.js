import Constants from "expo-constants";
const statusBarHeight = Constants.statusBarHeight;

export default {
  safeArea: {
    safeAreaAndroid: `${statusBarHeight}px`,
  },
  colors: {
    primaryColor: "#37CF8B",
    primaryColorDark: "#228056",
    secondaryColor: "#737373",
    secondaryColorDark: "#333",
    secondaryColorLight: "#fff",
    atentionColor: "#CF5037",
    atentionColorDark: "#9C3C29",
    lightColor: "#eee",
    darkColor: "#222",
  },
  font: {
    family: {
      light: "OpenSans_300Light",
      normal: "OpenSans_400Regular",
      semibold: "OpenSans_600SemiBold",
      bold: "OpenSans_700Bold",
    },
    size: {
      title: "20px",
      subtitle: "16px",
      text: "14px",
      details: "12px",
    },
  },
};
