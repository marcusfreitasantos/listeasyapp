import * as S from "./styles";
import { TouchableOpacityProps } from "react-native";

type ButtonProps = {
  btnText?: string;
  btnType?: "dark" | "light";
} & TouchableOpacityProps;

export const Button = ({
  btnText,
  btnType = "light",
  ...rest
}: ButtonProps) => {
  return (
    <S.ButtonWrapper {...rest} type={btnType}>
      <S.ButtonText type={btnType}>{btnText ? btnText : "Enviar"}</S.ButtonText>
    </S.ButtonWrapper>
  );
};
