import { useState } from "react";
import { TextInputProps, useColorScheme } from "react-native";
import * as S from "./styles";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";
import { FeatherIconName } from "@/@types/icons";

type InputFieldProps = {
  iconName: FeatherIconName;
  marginBottom?: boolean;
} & TextInputProps;

export const InputField = ({
  iconName,
  marginBottom = true,
  ...rest
}: InputFieldProps) => {
  const [secureText, setSecureText] = useState(rest.secureTextEntry);
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.medium.replace("px", ""));

  return (
    <S.InputFieldWrapper marginBottom={marginBottom}>
      {iconName && (
        <Feather
          name={iconName}
          size={iconSize}
          color={
            colorScheme === "dark" ? theme.secondaryColor : theme.primaryColor
          }
        />
      )}
      <S.InputField
        {...rest}
        autoCapitalize="none"
        secureTextEntry={secureText}
        placeholderTextColor={
          colorScheme === "dark" ? theme.secondaryColor : theme.primaryColor
        }
      />

      {rest.secureTextEntry && (
        <Feather
          name={secureText ? "eye" : "eye-off"}
          size={iconSize}
          color={
            colorScheme === "dark" ? theme.secondaryColor : theme.primaryColor
          }
          onPress={() => setSecureText(!secureText)}
        />
      )}
    </S.InputFieldWrapper>
  );
};
