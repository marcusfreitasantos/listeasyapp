import * as S from "./styles";
import { TouchableOpacityProps } from "react-native";

type ButtonProps = {
  btnText?: string;
  btnType?: "dark" | "light";
  btnStyle?: "solid" | "outline";
} & TouchableOpacityProps;

export const Button = ({
  btnText,
  btnType = "light",
  btnStyle = "solid",
  ...rest
}: ButtonProps) => {
  return (
    <S.ButtonWrapper {...rest} type={btnType} btnStyle={btnStyle}>
      <S.ButtonText type={btnType}>{btnText ? btnText : "Enviar"}</S.ButtonText>
    </S.ButtonWrapper>
  );
};
