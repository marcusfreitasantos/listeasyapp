import { useState, useEffect, useContext } from "react";
import { SampleLists } from "@/src/mocks/lists";
import { ListEntityType } from "../model/list";
import { GlobalListContext } from "@/src/context/listContext";
import { GlobalUserContext } from "@/src/context/userContext";

export const useListManagerViewModel = () => {
  const { currentUser } = useContext(GlobalUserContext);
  const { setListsLength } = useContext(GlobalListContext);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [currentUserLists, setCurrentUserLists] = useState<
    ListEntityType[] | []
  >(SampleLists);

  const createNewList = (listName: string) => {
    if (currentUser?.user?.uid) {
      const newEmptyList = {
        id: Math.random().toString(),
        title: listName,
        creationDate: new Date().getTime(),
        totalPrice: 0,
        items: [],
        authorId: currentUser.user.uid,
      };

      setCurrentUserLists((prev) => [...prev, newEmptyList]);
      setModalIsOpen(false);
    }
  };

  const removeList = (listId: string) => {
    const newCurrentUserLists = currentUserLists.filter(
      (list) => list.id !== listId
    );
    setCurrentUserLists(newCurrentUserLists);
  };

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
  };
};
