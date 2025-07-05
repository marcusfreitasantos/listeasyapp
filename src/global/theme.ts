import { RFValue } from "react-native-responsive-fontsize";

const defaultSizes = {
  xLarge: `${RFValue(36)}px`,
  large: `${RFValue(24)}px`,
  medium: `${RFValue(16)}px`,
  small: `${RFValue(12)}px`,
  xSmall: `${RFValue(10)}px`,
  xxSmall: `${RFValue(8)}px`,
};
const defaultFontFamily = "NunitoSans";
const defaultContainerSpacing = `${RFValue(10)}px`;
const defaultBorder = "1px solid #ddd";
const defaultBorderRadius = `${RFValue(10)}px`;
const darkTheme = {
  primaryColor: "#FFCC30",
  secondaryColor: "#222222",
  thirdColor: "#333333",
  lightGray: "#f1f1f1",
  textColor: "#555555",
  defaultSizes,
  defaultBorderRadius,
  defaultBorder,
  defaultFontFamily,
  defaultContainerSpacing,
};
const lightTheme = {
  primaryColor: "#222222",
  secondaryColor: "#FFCC30",
  thirdColor: "#333333",
  textColor: "#555555",
  lightGray: "#f1f1f1",
  defaultSizes,
  defaultBorderRadius,
  defaultBorder,
  defaultFontFamily,
  defaultContainerSpacing,
};

export { lightTheme, darkTheme };
