import "styled-components/native";
import { darkTheme } from "./src/global/theme";

type ThemeType = typeof darkTheme;

declare module "styled-components/native" {
  export interface DefaultTheme extends ThemeType {}
}
