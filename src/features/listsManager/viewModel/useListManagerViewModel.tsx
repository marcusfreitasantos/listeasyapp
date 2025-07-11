import { useState, useEffect } from "react";
import { SampleLists } from "@/src/mocks/lists";
import { ListEntityType } from "../model/list";

export const useListManagerViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUserLists, setCurrentUserLists] = useState<
    ListEntityType[] | []
  >(SampleLists);

  return {
    loading,
    searchTerm,
    setSearchTerm,
    currentUserLists,
  };
};
