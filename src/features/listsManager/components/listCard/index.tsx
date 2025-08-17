import { useState, useContext } from "react";
import { Alert } from "react-native";
import * as S from "./styles";
import { ListEntityType } from "../../model/list";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";
import { ListMenu } from "../listMenu";
import { GlobalListContext } from "@/src/context/listContext";
import { FeatherIconName } from "@/@types/icons";
import { getFormattedDate } from "@/src/utils/convertFirestoreTimestamp";
import { useRouter } from "expo-router";
import { centsToReais } from "@/src/utils/convertCurrency";
import { useBuildPDFTemplate } from "../../viewModel/useBuildPDFTemplate";
import { GlobalUserContext } from "@/src/context/userContext";

type ListCardProps = {
  list: ListEntityType;
  removeList: (listId: string) => void;
  generatePdf: (listName: string, html: string) => void;
};

export const ListCard = ({ list, removeList, generatePdf }: ListCardProps) => {
  const { currentUser } = useContext(GlobalUserContext);
  const { setCurrentList } = useContext(GlobalListContext);
  const router = useRouter();
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.large.replace("px", ""));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { buildHtmlPDFTemplate } = useBuildPDFTemplate();
  const isColaborator =
    list.colaboratorsIds?.includes(currentUser?.user.uid ?? "") ?? false;

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

  const handlePDFExport = () => {
    const html = buildHtmlPDFTemplate(list.title, list.items, list.totalPrice);
    generatePdf(list.title, html);
  };

  const handleEditList = () => {
    setCurrentList(list);
    router.push(`/lists/${list.id}`);
  };

  const handleShareListAccess = () => {
    setCurrentList(list);
    router.push("/sharedLists");
  };

  const listMenuOptions = [
    {
      label: "Editar",
      iconName: "edit" as FeatherIconName,
      onPress: () => handleEditList(),
      showOption: true,
    },
    {
      label: "Acesso compartilhado",
      iconName: "share-2" as FeatherIconName,
      onPress: () => handleShareListAccess(),
      showOption: !isColaborator,
    },
    {
      label: "Exportar em PDF",
      iconName: "file-text" as FeatherIconName,
      onPress: () => handlePDFExport(),
      showOption: true,
    },
    {
      label: "Excluir",
      iconName: "trash" as FeatherIconName,
      onPress: () => handleDeleteList(),
      showOption: !isColaborator,
    },
  ];

  return (
    <S.ListCardWrapper
      onPress={() => handleEditList()}
      isColaborator={isColaborator}
    >
      <S.ListCardHeader>
        <S.ListCardTitle numberOfLines={1}>{list.title}</S.ListCardTitle>

        {isColaborator && (
          <S.ListCardSubTitle>[compartilhada]</S.ListCardSubTitle>
        )}

        <S.ListCardMenuBtn onPress={() => setIsMenuOpen(!isMenuOpen)}>
          <Feather
            size={iconSize}
            color={theme.primaryColor}
            name={isMenuOpen ? "x" : "menu"}
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
