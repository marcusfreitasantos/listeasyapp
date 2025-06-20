import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    safeArea: {
      safeAreaAndroid: string;
    };
    colors: {
      primaryColor: string;
      primaryColorDark: string;
      secondaryColor: string;
      secondaryColorDark: string;
      secondaryColorLight: string;
      atentionColor: string;
      atentionColorDark: string;
      lightColor: string;
      darkColor: string;
    };
    font: {
      family: {
        normal: string;
        bold: string;
      };
      size: {
        title: string;
        subtitle: string;
        text: string;
        details: string;
      };
    };
  }
}
