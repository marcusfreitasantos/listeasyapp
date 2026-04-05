import { useState, useEffect, useContext } from "react";
import { GlobalListContext } from "@/src/context/listContext";
import { GlobalUserContext } from "@/src/context/userContext";
import {
  insertNewList,
  getListsByAuthorId,
  getListsByColaboratorId,
  removeListById,
} from "@/src/services/firebase/lists";
import { Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { File, Directory, Paths } from "expo-file-system";
import { GlobalProductsContext } from "@/src/context/productsContext";
import { useTranslation } from "react-i18next";
import { ListEntityType } from "../model/list";
import { GlobalSubscriptionContext } from "@/src/context/subscriptionContext";
import { useBuildPDFTemplate } from "./useBuildPDFTemplate";
import { router } from "expo-router";

export const useListManagerViewModel = () => {
  const { t, i18n } = useTranslation();
  const isFocused = useIsFocused();
  const { currentUser } = useContext(GlobalUserContext);
  const { currentSubscription } = useContext(GlobalSubscriptionContext);
  const { buildHtmlPDFTemplate } = useBuildPDFTemplate();
  const {
    currentUserLists,
    currentList,
    setListsLength,
    setCurrentUserLists,
    setCurrentList,
  } = useContext(GlobalListContext);
  const { currency } = useContext(GlobalProductsContext);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [isColaborator, setIsColaborator] = useState(false);

  const getUserLists = async () => {
    try {
      setLoading(true);
      if (!currentUser?.user?.uid) throw new Error("Usuário inválido");
      const response = await getListsByAuthorId(currentUser.user.uid);
      const sharedLists = await getListsByColaboratorId(currentUser.user.uid);
      setCurrentUserLists(sharedLists.concat(response));
    } catch (error) {
      Alert.alert("Oops!", `Não foi possível resgatar suas listas: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const createNewList = async (listName: string) => {
    if (currentUser?.user?.uid) {
      try {
        setLoading(true);
        const newEmptyList = {
          title: listName,
          totalPrice: 0,
          items: [],
          authorId: currentUser.user.uid,
        };
        await insertNewList(newEmptyList);
      } catch (error) {
        Alert.alert("Oops!", `Não foi possível criar a lista: ${error}`);
      } finally {
        getUserLists();
        setModalIsOpen(false);
      }
    }
  };

  const removeList = async (listId: string) => {
    try {
      setLoading(true);
      await removeListById(listId);
    } catch (error) {
      Alert.alert("Oops!", `Não foi possível remover a lista: ${error}`);
    } finally {
      getUserLists();
    }
  };

  const generatePdf = async (listName: string, html: string) => {
    try {
      setLoading(true);

      const safeName = `lista_${listName
        .toLowerCase()
        .replace(/[^a-z0-9_]/gi, "")}_${Date.now()}.pdf`;

      const pdfFile = await printToFileAsync({
        html,
        base64: false,
      });

      await shareAsync(pdfFile.uri, {
        mimeType: "application/pdf",
      });
    } catch (error) {
      Alert.alert("Oops!", `Não foi possível gerar o PDF da lista: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteList = (list: ListEntityType) => {
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
      ],
    );
  };

  const handleRemoveCurrentUserFromSharedList = (list: ListEntityType) => {
    setCurrentList(list);

    const invitedUser = {
      userId: currentUser?.user.uid ?? "",
      userName: currentUser?.user.displayName ?? "",
      userEmail: currentUser?.user.email ?? "",
    };

    (async () => {
      const mod =
        await import("../../sharedLists/viewModel/useShareListsViewModel");
      const { handleRemoveColaboratorFromCurrentList } =
        mod.useShareListsViewModel();
      handleRemoveColaboratorFromCurrentList(invitedUser, list);
    })();
  };

  const handlePDFExport = (list: ListEntityType) => {
    const html = buildHtmlPDFTemplate(list.title, list.items, list.totalPrice);
    generatePdf(list.title, html);
  };

  const handleEditList = (list: ListEntityType) => {
    setCurrentList(list);
    router.push(`/lists/${list.id}`);
  };

  const handleShareListAccess = (list: ListEntityType) => {
    setCurrentList(list);
    router.push("/sharedLists");
  };

  useEffect(() => {
    if (isFocused) {
      getUserLists();
      setSearchTerm("");
    }
  }, [isFocused]);

  useEffect(() => {
    setListsLength(currentUserLists.length);
  }, [currentUserLists]);

  useEffect(() => {
    setIsColaborator(
      currentList?.colaboratorsIds?.includes(currentUser?.user.uid ?? "") ??
        false,
    );
  }, [currentList]);

  return {
    loading,
    searchTerm,
    currentUserLists,
    modalIsOpen,
    currency,
    isColaborator,
    t,
    i18n,
    setSearchTerm,
    createNewList,
    setModalIsOpen,
    removeList,
    getUserLists,
    handleDeleteList,
    handleRemoveCurrentUserFromSharedList,
    handlePDFExport,
    handleEditList,
    handleShareListAccess,
  };
};
