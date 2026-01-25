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
const defaultContainerSpacing = `${RFValue(16)}px`;
const defaultBorder = "1px solid #ddd";
const defaultBorderRadius = `${RFValue(6)}px`;

const defaultTheme = {
  defaultSizes,
  defaultBorderRadius,
  defaultBorder,
  defaultFontFamily,
  defaultContainerSpacing,
};

const darkTheme = {
  ...defaultTheme,
  primaryColor: "#FFCC30",
  secondaryColor: "#222222",
  thirdColor: "#333333",
  lightGray: "#f1f1f1",
  textColor: "#555555",
};

const lightTheme = {
  ...defaultTheme,
  primaryColor: "#222222",
  secondaryColor: "#f1f1f1",
  thirdColor: "#d9d9d9",
  textColor: "#333333",
  lightGray: "#FFCC30",
};

export { lightTheme, darkTheme };
