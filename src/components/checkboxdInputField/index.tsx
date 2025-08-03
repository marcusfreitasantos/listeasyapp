import { useTheme } from "styled-components/native";
import * as S from "./styles";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";

type CheckboxInputFieldProps = {
  isItemChecked: boolean;
  handleCheckItem: (isChecked: boolean) => void;
};

export const CheckboxInputField = ({
  isItemChecked,
  handleCheckItem,
}: CheckboxInputFieldProps) => {
  const [isChecked, setIsChecked] = useState(isItemChecked);
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.medium.replace("px", ""));

  const handleCheck = () => {
    setIsChecked(!isChecked);
    handleCheckItem(!isChecked);
  };

  return (
    <S.CheckBoxItem size={iconSize} onPress={handleCheck}>
      {isChecked && (
        <Feather size={iconSize} color={theme.primaryColor} name="check" />
      )}
    </S.CheckBoxItem>
  );
};
