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
      console.log("updatedList__", updatedList);
      setCurrentList(updatedList);
    } catch (e) {
      console.log(e);
    } finally {
      setModalIsOpen(false);
      setLoading(false);
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
      console.log("updatedList__", updatedList);
      setCurrentList(updatedList);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    updateListItems,
    currentList,
    modalIsOpen,
    searchTerm,
    setModalIsOpen,
    setSearchTerm,
    loading,
    removeItemFromList,
  };
};
