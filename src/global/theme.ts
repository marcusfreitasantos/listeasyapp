import { RFValue } from "react-native-responsive-fontsize";

const defaultSizes = {
  xLarge: `${RFValue(36)}px`,
  large: `${RFValue(24)}px`,
  medium: `${RFValue(16)}px`,
  small: `${RFValue(12)}px`,
  xSmall: `${RFValue(10)}px`,
  xxSmall: `${RFValue(8)}px`,
};

const deafaultFontFamily = "NunitoSans";

const defaultBorder = "1px solid #ddd";

const defaultBorderRadius = "50px";

const darkTheme = {
  primaryColor: "#222222",
  secondaryColor: "#FFCC30",
  lightGray: "#f1f1f1",
  textColor: "#555555",
  defaultSizes,
  defaultBorderRadius,
  defaultBorder,
  deafaultFontFamily,
};
const lightTheme = {
  primaryColor: "#FFCC30",
  secondaryColor: "#222222",
  textColor: "#555555",
  lightGray: "#f1f1f1",
  defaultSizes,
  defaultBorderRadius,
  defaultBorder,
  deafaultFontFamily,
};

export { lightTheme, darkTheme };
