import { useState, useEffect, useContext } from "react";
import { ListEntityType } from "../model/list";
import { GlobalListContext } from "@/src/context/listContext";
import { GlobalUserContext } from "@/src/context/userContext";
import {
  insertNewList,
  getListsByAuthorId,
  removeListById,
} from "@/src/services/firebase/lists";
import { Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";

export const useListManagerViewModel = () => {
  const isFocused = useIsFocused();
  const { currentUser } = useContext(GlobalUserContext);
  const { setListsLength } = useContext(GlobalListContext);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [currentUserLists, setCurrentUserLists] = useState<
    ListEntityType[] | []
  >([]);

  const getUserLists = async () => {
    try {
      setLoading(true);
      if (!currentUser?.user?.uid) throw new Error("Usuário inválido");
      const response = await getListsByAuthorId(currentUser.user.uid);
      setCurrentUserLists(response);
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
      const file = await printToFileAsync({
        html,
        base64: false,
      });

      const pdfName = `${file.uri.slice(
        0,
        file.uri.lastIndexOf("/") + 1
      )}lista_${listName.toLowerCase().replaceAll(" ", "_")}.pdf`;

      await FileSystem.moveAsync({
        from: file.uri,
        to: pdfName,
      });

      await shareAsync(pdfName);
    } catch (error) {
      Alert.alert("Oops!", `Não foi possível gerar o PDF da lista: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) getUserLists();
  }, [isFocused]);

  useEffect(() => {
    setListsLength(currentUserLists.length);
  }, [currentUserLists]);

  return {
    loading,
    searchTerm,
    setSearchTerm,
    currentUserLists,
    createNewList,
    modalIsOpen,
    setModalIsOpen,
    removeList,
    getUserLists,
    generatePdf,
  };
};
