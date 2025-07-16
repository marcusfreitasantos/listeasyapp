import { useState, useContext, useEffect } from "react";
import { GlobalListContext } from "@/src/context/listContext";
import { updateListContent } from "@/src/services/firebase/lists";
import { ListItemType } from "../../listsManager/model/list";

export const useListContentViewModel = () => {
  const { currentList, setCurrentList } = useContext(GlobalListContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const updateListItems = async (listItems: ListItemType) => {
    try {
      setLoading(true);
      if (!currentList) throw new Error("Lista inválida");

      const updatedList = {
        ...currentList,
        totalPrice: calculateCurrentListTotal(),
        items: [...currentList.items, listItems],
      };

      await updateListContent(updatedList);
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
        totalPrice: calculateCurrentListTotal(),
        items: itemsUpdated,
      };

      await updateListContent(updatedList);
      setCurrentList(updatedList);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const calculateCurrentListTotal = () => {
    let total = 0;

    currentList?.items.forEach((item: ListItemType) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
    });

    return total;
  };

  return {
    updateListItems,
    currentList,
    modalIsOpen,
    searchTerm,
    setModalIsOpen,
    setSearchTerm,
    loading,
    calculateCurrentListTotal,
    removeItemFromList,
  };
};
