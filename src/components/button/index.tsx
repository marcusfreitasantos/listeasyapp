import * as S from "./styles";
import { TouchableOpacityProps } from "react-native";

type ButtonProps = {
  btnText?: string;
} & TouchableOpacityProps;

export const Button = ({ btnText, ...rest }: ButtonProps) => {
  return (
    <S.ButtonWrapper {...rest}>
      <S.ButtonText>{btnText ? btnText : "Enviar"}</S.ButtonText>
    </S.ButtonWrapper>
  );
};
