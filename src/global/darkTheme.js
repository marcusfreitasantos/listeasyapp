import Constants from "expo-constants";
const statusBarHeight = Constants.statusBarHeight;

export default {
  safeArea: {
    safeAreaAndroid: `${statusBarHeight}px`,
  },
  colors: {
    primaryColor: "#37CF8B",
    primaryColorDark: "#228056",
    secondaryColor: "#fff",
    secondaryColorDark: "#333",
    secondaryColorLight: "#424242",
    atentionColor: "#CF5037",
    atentionColorDark: "#9C3C29",
    lightColor: "#222",
    darkColor: "#eee",
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
