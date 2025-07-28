import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";

export const LoadingSpinner = () => {
  const theme = useTheme();
  return <ActivityIndicator color={theme.primaryColor} style={{ flex: 1 }} />;
};
