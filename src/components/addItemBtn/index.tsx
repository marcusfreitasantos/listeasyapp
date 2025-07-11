import * as S from "./styles";
import { useTheme } from "styled-components/native";
import Feather from "@expo/vector-icons/Feather";

type AddItemBtnProps = {
  onPress: () => void;
};

export const AddItemBtn = ({ onPress }: AddItemBtnProps) => {
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.large.replace("px", ""));
  return (
    <S.BtnWrapper>
      <S.BtnContent onPress={onPress}>
        <Feather
          size={iconSize}
          color={theme.secondaryColor}
          name="plus-circle"
        />
      </S.BtnContent>
    </S.BtnWrapper>
  );
};
