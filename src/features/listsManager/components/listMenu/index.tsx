import * as S from "./styles";
import Feather from "@expo/vector-icons/Feather";
import { FeatherIconName } from "@/@types/icons";
import { useTheme } from "styled-components/native";

type ListMenuProps = {
  options: {
    label: string;
    iconName: FeatherIconName;
    onPress: () => void;
    showOption: boolean;
  }[];
};

export const ListMenu = ({ options }: ListMenuProps) => {
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.medium.replace("px", ""));

  return (
    <S.ListMenuWrapper>
      {options &&
        options.map((option) => {
          if (option.showOption)
            return (
              <S.ListMenuItem key={option.label} onPress={option.onPress}>
                <Feather
                  name={option.iconName}
                  size={iconSize}
                  color={theme.primaryColor}
                />
                <S.ListMenuItemText>{option.label}</S.ListMenuItemText>
              </S.ListMenuItem>
            );
        })}
    </S.ListMenuWrapper>
  );
};
