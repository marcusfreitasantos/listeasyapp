import { Alert } from "react-native";
import * as S from "./styles";
import { ListEntityType } from "../../model/list";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";
import { ListMenu } from "../listMenu";
import { useState, useContext, useEffect } from "react";
import { GlobalListContext } from "@/src/context/listContext";
import { FeatherIconName } from "@/@types/icons";
import { getFormattedDate } from "@/src/utils/convertFirestoreTimestamp";
import { useRouter } from "expo-router";
import { centsToReais } from "@/src/utils/convertCurrency";

type ListCardProps = {
  list: ListEntityType;
  removeList: (listId: string) => void;
};

export const ListCard = ({ list, removeList }: ListCardProps) => {
  const { setCurrentList } = useContext(GlobalListContext);
  const router = useRouter();
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.large.replace("px", ""));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDeleteList = () => {
    Alert.alert("Atenção!", `A lista '${list.title}' será excluída.`, [
      {
        text: "Cancelar",
      },
      {
        text: "Confirmar",
        onPress: () => {
          if (list.id) removeList(list.id);
        },
      },
    ]);
  };

  const handleEditList = () => {
    setCurrentList(list);
    router.push(`/lists/${list.id}`);
  };

  const listMenuOptions = [
    {
      label: "Editar",
      iconName: "edit" as FeatherIconName,
      onPress: () => handleEditList(),
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
      onPress: () => handleDeleteList(),
    },
  ];

  return (
    <S.ListCardWrapper>
      <S.ListCardHeader>
        <S.ListCardTitle numberOfLines={1}>{list.title}</S.ListCardTitle>

        <S.ListCardMenuBtn onPress={() => setIsMenuOpen(!isMenuOpen)}>
          <Feather
            size={iconSize}
            color={theme.primaryColor}
            name={isMenuOpen ? "x" : "more-horizontal"}
          />
        </S.ListCardMenuBtn>
      </S.ListCardHeader>

      {isMenuOpen ? (
        <ListMenu options={listMenuOptions} />
      ) : (
        <S.ListCardInfoWrapper>
          <S.ListCardTotalPriceWrapper>
            <S.ListCardTotalPriceTextBold>Total: </S.ListCardTotalPriceTextBold>

            <S.ListCardTotalPriceTextRegular>
              {centsToReais(list.totalPrice).toFixed(2)}
            </S.ListCardTotalPriceTextRegular>
          </S.ListCardTotalPriceWrapper>

          <S.ListCardTotalPriceTextRegular>
            Atualização: {getFormattedDate(list.updatedAt)}
          </S.ListCardTotalPriceTextRegular>
        </S.ListCardInfoWrapper>
      )}
    </S.ListCardWrapper>
  );
};
