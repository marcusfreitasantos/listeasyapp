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
  primaryColor: "#FFCC30",
  secondaryColor: "#222222",
  lightGray: "#f1f1f1",
  defaultSizes,
  defaultBorderRadius,
};
const lightTheme = {
  primaryColor: "#FFCC30",
  secondaryColor: "#222222",
  lightGray: "#f1f1f1",
  defaultSizes,
  defaultBorderRadius,
};

export { lightTheme, darkTheme };
