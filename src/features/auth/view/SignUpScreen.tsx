import { useColorScheme } from "react-native";
import * as S from "./styles";
import Logo from "@/src/components/logo";

export const SignUpScreen = () => {
  const colorScheme = useColorScheme();

  return (
    <S.Container>
      <Logo color={colorScheme ?? "dark"} />
      <S.ScreenTitle>Signup</S.ScreenTitle>
    </S.Container>
  );
};
