import { useTheme } from "styled-components/native";
import * as S from "./styles";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";

type CheckboxInputFieldProps = {
  isItemChecked: boolean;
  checkBoxLabel?: string;
  handleCheckItem: (isChecked: boolean) => void;
};

export const CheckboxInputField = ({
  isItemChecked,
  checkBoxLabel,
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
    <S.CheckBoxItemWrapper onPress={handleCheck}>
      <S.CheckBoxItem size={iconSize}>
        {isChecked && (
          <Feather size={iconSize} color={theme.primaryColor} name="check" />
        )}
      </S.CheckBoxItem>

      {checkBoxLabel && (
        <S.CheckBoxItemLabel>{checkBoxLabel}</S.CheckBoxItemLabel>
      )}
    </S.CheckBoxItemWrapper>
  );
};
