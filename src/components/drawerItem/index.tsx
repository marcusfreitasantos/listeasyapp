import * as S from "./styles";
import { Link } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";
import { FeatherIconName } from "@/@types/icons";
import { Pressable } from "react-native";

type DrawerItemProps = {
  route: string;
  title: string;
  iconName: FeatherIconName;
  onPress?: () => void;
};

export const DrawerItem = ({
  route,
  title,
  iconName,
  onPress,
}: DrawerItemProps) => {
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.medium.replace("px", ""));

  return onPress ? (
    <S.DrawerItem onPress={() => onPress()}>
      <Feather name={iconName} size={iconSize} color={theme.primaryColor} />
      <S.DrawerItemText>{title}</S.DrawerItemText>
    </S.DrawerItem>
  ) : (
    <Link href={route as any} asChild>
      <S.DrawerItem>
        <Feather name={iconName} size={iconSize} color={theme.primaryColor} />
        <S.DrawerItemText>{title}</S.DrawerItemText>
      </S.DrawerItem>
    </Link>
  );
};
