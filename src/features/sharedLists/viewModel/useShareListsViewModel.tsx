import { useContext, useState, useEffect } from "react";
import { GlobalListContext } from "@/src/context/listContext";

export const useShareListsViewModel = () => {
  const { currentList } = useContext(GlobalListContext);
  const [loading, setLoading] = useState(false);

  return {
    currentList,
    loading,
  };
};
