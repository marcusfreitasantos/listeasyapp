import * as S from "./styles";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";
import { TextInputProps } from "react-native";
import { FeatherIconName } from "@/@types/icons";
import { useColorScheme } from "react-native";

type InputFieldProps = {
  iconName: FeatherIconName;
} & TextInputProps;

export const InputField = ({ iconName, ...rest }: InputFieldProps) => {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.medium.replace("px", ""));
  return (
    <S.InputFieldWrapper>
      {iconName && (
        <Feather
          name={iconName}
          size={iconSize}
          color={
            colorScheme === "dark" ? theme.primaryColor : theme.secondaryColor
          }
        />
      )}
      <S.InputField {...rest} />
    </S.InputFieldWrapper>
  );
};
