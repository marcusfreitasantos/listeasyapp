import { useTheme } from "styled-components/native";
import * as S from "./styles";
import Feather from "@expo/vector-icons/Feather";

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
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.medium.replace("px", ""));

  const handleCheck = () => {
    handleCheckItem(!isItemChecked);
  };

  return (
    <S.CheckBoxItemWrapper
      onPress={handleCheck}
      onPressIn={(e) => e.stopPropagation()}
      hitSlop={40}
    >
      <S.CheckBoxItem size={iconSize}>
        {isItemChecked && (
          <Feather size={iconSize} color={theme.primaryColor} name="check" />
        )}
      </S.CheckBoxItem>

      {checkBoxLabel && (
        <S.CheckBoxItemLabel>{checkBoxLabel}</S.CheckBoxItemLabel>
      )}
    </S.CheckBoxItemWrapper>
  );
};
