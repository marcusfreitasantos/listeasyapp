import * as S from "./styles";
import { useTheme } from "styled-components/native";
import Feather from "@expo/vector-icons/Feather";
import { useColorScheme } from "react-native";

type AddItemBtnProps = {
  modalIsOpen: boolean;
  onPress: () => void;
};

export const AddItemBtn = ({ onPress, modalIsOpen }: AddItemBtnProps) => {
  const colorScheme = useColorScheme() as "dark" | "light";
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.large.replace("px", ""));

  const handleBtnPress = () => {
    onPress();
  };

  return (
    <S.BtnWrapper>
      <S.BtnContent
        onPress={handleBtnPress}
        testID="add_item_btn"
        type={colorScheme ?? "light"}
      >
        <Feather
          testID="add_item_icon"
          size={iconSize}
          color={
            colorScheme === "dark" ? theme.secondaryColor : theme.primaryColor
          }
          name={modalIsOpen ? "x" : "plus-circle"}
        />
      </S.BtnContent>
    </S.BtnWrapper>
  );
};
