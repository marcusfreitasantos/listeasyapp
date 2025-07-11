import * as S from "./styles";
import { ListEntityType } from "../../model/list";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";
import { ListMenu } from "../listMenu";
import { useState } from "react";
import { FeatherIconName } from "@/@types/icons";

type ListCardProps = {
  list: ListEntityType;
};

export const ListCard = ({ list }: ListCardProps) => {
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.medium.replace("px", ""));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const listMenuOptions = [
    {
      label: "Editar",
      iconName: "edit" as FeatherIconName,
      onPress: () => console.log("editar"),
    },
    {
      label: "Compartilhar",
      iconName: "share-2" as FeatherIconName,
      onPress: () => console.log("comparitlhar"),
    },
    {
      label: "Exportar PDF",
      iconName: "file-text" as FeatherIconName,

      onPress: () => console.log("Exportar em pdf"),
    },
    {
      label: "Excluir",
      iconName: "trash" as FeatherIconName,
      onPress: () => console.log("excluir"),
    },
  ];

  return (
    <S.ListCardWrapper>
      {isMenuOpen ? (
        <ListMenu options={listMenuOptions} />
      ) : (
        <S.ListCardInfoWrapper>
          <S.ListCardTitle numberOfLines={1}>{list.title}</S.ListCardTitle>
          <S.ListCardTotalPriceWrapper>
            <S.ListCardTotalPriceTextBold>Total: </S.ListCardTotalPriceTextBold>

            <S.ListCardTotalPriceTextRegular>
              {list.totalPrice}
            </S.ListCardTotalPriceTextRegular>
          </S.ListCardTotalPriceWrapper>
        </S.ListCardInfoWrapper>
      )}

      <S.ListCardMenuBtn onPress={() => setIsMenuOpen(!isMenuOpen)}>
        <Feather
          size={iconSize}
          color={theme.primaryColor}
          name={isMenuOpen ? "x-circle" : "more-vertical"}
        />
      </S.ListCardMenuBtn>
    </S.ListCardWrapper>
  );
};
