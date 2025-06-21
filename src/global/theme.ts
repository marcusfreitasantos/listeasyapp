import { RFValue } from "react-native-responsive-fontsize";

const defaultSizes = {
  xLarge: `${RFValue(36)}px`,
  large: `${RFValue(24)}px`,
  medium: `${RFValue(16)}px`,
  small: `${RFValue(12)}px`,
  xSmall: `${RFValue(10)}px`,
  xxSmall: `${RFValue(8)}px`,
};

const defaultBorderRadius = "50px";

const darkTheme = {
  primaryColor: "#1A61AA",
  primaryColorHover: "#1E4E88",
  primaryColorDark: "#0B1D33",
  secondaryColor: "#55BAAA",
  secondaryColorHover: "#248581",
  thirdColor: "#F0903A",
  textColor: "#333",
  lightGray: "#EEEEEE",
  defaultSizes,
  defaultBorderRadius,
};
const lightTheme = {
  primaryColor: "#1A61AA",
  primaryColorHover: "#1E4E88",
  primaryColorDark: "#0B1D33",
  secondaryColor: "#55BAAA",
  secondaryColorHover: "#248581",
  secondaryColorLight: "#A4E5DB",
  thirdColor: "#F0903A",
  textColor: "#333",
  lightGray: "#EEEEEE",
  defaultSizes,
  defaultBorderRadius,
};

export { lightTheme, darkTheme };
