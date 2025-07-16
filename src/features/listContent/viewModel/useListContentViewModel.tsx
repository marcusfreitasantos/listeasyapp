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
        items: [...currentList.items, listItems],
      };

      console.log("updatedList__", updatedList);
      await updateListContent(updatedList);
      setCurrentList(updatedList);
    } catch (e) {
      console.log(e);
    } finally {
      setModalIsOpen(false);
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
  };
};
