import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    primaryColor: string;
    secondaryColor: string;
    lightGray: string;
    defaultSizes: {
      xLarge: string;
      large: string;
      medium: string;
      small: string;
      xSmall: string;
      xxSmall: string;
    };
    defaultBorderRadius: string;
  }
}
