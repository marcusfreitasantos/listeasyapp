import { createContext, useEffect, useState } from "react";
import { getLists } from "../services/ListQueries";

export const GlobalContext = createContext({});

export function InfoProvider({ children }) {
  const [totalLists, setTotalLists] = useState();
  const [userLists, setUserLists] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [currentListName, setCurrentListName] = useState("");
  const [currentItemsRow, setCurrentItemsRow] = useState([]);
  const [updatedList, setUpdatedList] = useState(false);
  const [modal, setModal] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  async function callLists() {
    const allLists = await getLists();
    setUserLists(allLists);
    setTotalLists(allLists.length);
  }

  useEffect(() => {
    callLists();
  }, [totalLists]);

  return (
    <GlobalContext.Provider
      value={{
        totalLists,
        setTotalLists,
        userLists,
        setUserLists,
        currentList,
        setCurrentList,
        currentListName,
        setCurrentListName,
        currentItemsRow,
        setCurrentItemsRow,
        updatedList,
        setUpdatedList,
        modal,
        setModal,
        isPurchased,
        setIsPurchased,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
