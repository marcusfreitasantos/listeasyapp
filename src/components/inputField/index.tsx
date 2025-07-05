import * as S from "./styles";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";
import { ComponentProps } from "react";
import { TextInputProps } from "react-native";

type FontAwesomeIconName = ComponentProps<typeof Feather>["name"];

type InputFieldProps = {
  iconName: FontAwesomeIconName;
} & TextInputProps;

export const InputField = ({ iconName, ...rest }: InputFieldProps) => {
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.medium.replace("px", ""));
  return (
    <S.InputFieldWrapper>
      {iconName && (
        <Feather name={iconName} size={iconSize} color={theme.primaryColor} />
      )}
      <S.InputField {...rest} />
    </S.InputFieldWrapper>
  );
};
