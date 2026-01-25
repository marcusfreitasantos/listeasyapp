import * as S from "./styles";
import { TouchableOpacityProps } from "react-native";
import { useColorScheme } from "react-native";

type ButtonProps = {
  btnText: string;
  btnStyle?: "solid" | "outline";
} & TouchableOpacityProps;

export const Button = ({
  btnText,
  btnStyle = "solid",
  ...rest
}: ButtonProps) => {
  const colorScheme = useColorScheme();
  return (
    <S.ButtonWrapper
      {...rest}
      type={colorScheme ?? "light"}
      btnStyle={btnStyle}
    >
      <S.ButtonText type={colorScheme ?? "light"}>{btnText}</S.ButtonText>
    </S.ButtonWrapper>
  );
};
