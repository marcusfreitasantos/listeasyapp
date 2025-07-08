import { Link } from "expo-router";
import * as S from "./styles";

type DrawerCustomContentProps = {
  items: {
    route: string;
    title: string;
  }[];
};

export const DrawerCustomContent = ({ items }: DrawerCustomContentProps) => {
  return (
    <S.DrawerWrapper>
      <S.DrawerContainer>
        <S.DrawerItemGroup>
          {items &&
            items.map((item) => {
              return (
                <Link
                  key={item.route}
                  href={item.route as any}
                  asChild
                  dismissTo
                >
                  <S.DrawerItem>
                    <S.DrawerItemText>{item.title}</S.DrawerItemText>
                  </S.DrawerItem>
                </Link>
              );
            })}
        </S.DrawerItemGroup>
        <S.DrawerItem>
          <S.DrawerItemText>Sair</S.DrawerItemText>
        </S.DrawerItem>
      </S.DrawerContainer>
    </S.DrawerWrapper>
  );
};
