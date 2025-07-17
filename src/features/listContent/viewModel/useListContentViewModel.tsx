import { useState, useContext, useEffect } from "react";
import { GlobalListContext } from "@/src/context/listContext";
import { updateListContent } from "@/src/services/firebase/lists";
import { ListItemType } from "../../listsManager/model/list";
import { calculateCurrentListTotal } from "@/src/utils/calculateCurrentListTotal";

export const useListContentViewModel = () => {
  const { currentList, setCurrentList } = useContext(GlobalListContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState<ListItemType | null>(null);
  const [renameModalIsOpen, setRenameModalIsOpen] = useState(false);

  const resetStates = () => {
    setModalIsOpen(false);
    setLoading(false);
    setCurrentItem(null);
    setRenameModalIsOpen(false);
  };

  const updateListItems = async (listItems: ListItemType) => {
    try {
      setLoading(true);
      if (!currentList) throw new Error("Lista inválida");

      const updatedItems = [...currentList.items, listItems];

      const updatedList = {
        ...currentList,
        totalPrice: calculateCurrentListTotal(updatedItems),
        items: updatedItems,
      };

      await updateListContent(updatedList);
      setCurrentList(updatedList);
    } catch (e) {
      console.log(e);
    } finally {
      resetStates();
    }
  };

  const updateListName = async (listName: string) => {
    try {
      setLoading(true);
      if (!currentList) throw new Error("Lista inválida");

      const updatedList = {
        ...currentList,
        title: listName,
      };

      await updateListContent(updatedList);
      setCurrentList(updatedList);
    } catch (e) {
      console.log(e);
    } finally {
      resetStates();
    }
  };

  const updateItemInList = async (
    itemIndex: number,
    updatedItem: ListItemType
  ) => {
    try {
      setLoading(true);
      if (!currentList) throw new Error("Lista inválida");

      const itemsUpdated = [...currentList.items];
      itemsUpdated[itemIndex] = updatedItem;

      const updatedList = {
        ...currentList,
        totalPrice: calculateCurrentListTotal(itemsUpdated),
        items: itemsUpdated,
      };

      await updateListContent(updatedList);
      setCurrentList(updatedList);
    } catch (e) {
      console.log(e);
    } finally {
      resetStates();
    }
  };

  const removeItemFromList = async (itemToRemoveIndex: number) => {
    try {
      setLoading(true);
      if (!currentList) throw new Error("Lista inválida");

      const itemsUpdated = currentList?.items;
      itemsUpdated?.splice(itemToRemoveIndex, 1);

      const updatedList = {
        ...currentList,
        totalPrice: calculateCurrentListTotal(itemsUpdated),
        items: itemsUpdated,
      };

      await updateListContent(updatedList);
      setCurrentList(updatedList);
    } catch (e) {
      console.log(e);
    } finally {
      resetStates();
    }
  };

  useEffect(() => {
    if (!modalIsOpen) setCurrentItem(null);
  }, [modalIsOpen]);

  return {
    updateListItems,
    currentList,
    modalIsOpen,
    searchTerm,
    setModalIsOpen,
    setSearchTerm,
    loading,
    removeItemFromList,
    currentItem,
    setCurrentItem,
    updateItemInList,
    renameModalIsOpen,
    setRenameModalIsOpen,
    updateListName,
  };
};
