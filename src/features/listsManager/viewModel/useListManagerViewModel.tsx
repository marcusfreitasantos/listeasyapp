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
    const newEmptyList = {
      id: Math.random().toString(),
      title: listName,
      creationDate: new Date().getTime(),
      totalPrice: 0,
      items: [],
      author: {
        id: "string",
        name: "string",
        email: "string",
      },
    };

    setCurrentUserLists((prev) => [...prev, newEmptyList]);
    setModalIsOpen(false);
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
  };
};
