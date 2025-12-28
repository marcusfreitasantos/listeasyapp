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
import { InvitedUserEntity } from "@/src/features/sharedLists/model/invitedUser";
import { GlobalSubscriptionContext } from "@/src/context/subscriptionContext";
import { useTranslation } from "react-i18next";

type ListCardProps = {
  list: ListEntityType;
  removeList: (listId: string) => void;
  generatePdf: (listName: string, html: string) => void;
  removeCurrentUserFromSharedList: (
    invitedUser: InvitedUserEntity,
    list: ListEntityType
  ) => void;
};

export const ListCard = ({
  list,
  removeList,
  generatePdf,
  removeCurrentUserFromSharedList,
}: ListCardProps) => {
  const { t } = useTranslation();
  const { currentUser } = useContext(GlobalUserContext);
  const { setCurrentList } = useContext(GlobalListContext);
  const { currentSubscription } = useContext(GlobalSubscriptionContext);
  const router = useRouter();
  const theme = useTheme();
  const iconSize = Number(theme.defaultSizes.large.replace("px", ""));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { buildHtmlPDFTemplate } = useBuildPDFTemplate();
  const isColaborator =
    list.colaboratorsIds?.includes(currentUser?.user.uid ?? "") ?? false;

  const essentialPlanId = "plan_essencial";

  const handleDeleteList = () => {
    Alert.alert(
      t("warning"),
      t("list_will_be_deleted", { list_name: list.title }),
      [
        {
          text: t("cancel"),
        },
        {
          text: t("confirm"),
          onPress: () => {
            if (list.id) removeList(list.id);
          },
        },
      ]
    );
  };

  const handleRemoveCurrentUserFromSharedList = () => {
    setCurrentList(list);

    const invitedUser = {
      userId: currentUser?.user.uid ?? "",
      userName: currentUser?.user.displayName ?? "",
      userEmail: currentUser?.user.email ?? "",
    };

    removeCurrentUserFromSharedList(invitedUser, list);
  };

  const handlePDFExport = () => {
    if (
      currentSubscription?.status === "active" &&
      currentSubscription?.productId !== essentialPlanId
    ) {
      const html = buildHtmlPDFTemplate(
        list.title,
        list.items,
        list.totalPrice
      );
      generatePdf(list.title, html);
    } else {
      router.push("/(drawer)/subscriptions");
    }
  };

  const handleEditList = () => {
    setCurrentList(list);
    router.push(`/lists/${list.id}`);
  };

  const handleShareListAccess = () => {
    setCurrentList(list);
    if (
      currentSubscription?.status === "active" &&
      currentSubscription?.productId !== essentialPlanId
    ) {
      router.push("/sharedLists");
    } else {
      router.push("/(drawer)/subscriptions");
    }
  };

  const listMenuOptions = [
    {
      label: t("edit"),
      iconName: "edit" as FeatherIconName,
      onPress: () => handleEditList(),
      showOption: true,
    },
    {
      label: t("shared_access"),
      iconName: "share-2" as FeatherIconName,
      onPress: () => handleShareListAccess(),
      showOption: true,
    },
    {
      label: t("pdf_export"),
      iconName: "file-text" as FeatherIconName,
      onPress: () => handlePDFExport(),
      showOption: true,
    },
    {
      label: t("delete"),
      iconName: "trash" as FeatherIconName,
      onPress: () => handleDeleteList(),
      showOption: !isColaborator,
    },
    {
      label: t("quit_list"),
      iconName: "delete" as FeatherIconName,
      onPress: () => handleRemoveCurrentUserFromSharedList(),
      showOption: isColaborator,
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
          <S.ListCardSubTitle>[{t("shared")}]</S.ListCardSubTitle>
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
            {t("updated_at")}: {getFormattedDate(list.updatedAt)}
          </S.ListCardTotalPriceTextRegular>
        </S.ListCardInfoWrapper>
      )}
    </S.ListCardWrapper>
  );
};
