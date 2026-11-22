import * as Application from "expo-application";
import Constants from "expo-constants";
import { Platform } from "react-native";
import * as S from "./styles";

const versionName =
  Application.nativeApplicationVersion || Constants.expoConfig?.version;

const versionCode =
  Application.nativeBuildVersion ||
  (Platform.OS === "android"
    ? Constants.expoConfig?.android?.versionCode?.toString()
    : Constants.expoConfig?.ios?.buildNumber);

export const AppVersion = () => {
  if (!versionName || !versionCode) {
    return null;
  }

  return (
    <S.LabelWrapper>
      <S.Label>
        v{versionName}/{versionCode}
      </S.Label>
    </S.LabelWrapper>
  );
};
