import * as S from "./styles";
import { Link } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";
import { FeatherIconName } from "@/@types/icons";

type DrawerItemProps = {
  route: string;
  title: string;
  iconName: FeatherIconName;
};

export const DrawerItem = ({ route, title, iconName }: DrawerItemProps) => {
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.medium.replace("px", ""));

  return (
    <Link href={route as any} asChild dismissTo>
      <S.DrawerItem>
        <Feather name={iconName} size={iconSize} color={theme.primaryColor} />
        <S.DrawerItemText>{title}</S.DrawerItemText>
      </S.DrawerItem>
    </Link>
  );
};
