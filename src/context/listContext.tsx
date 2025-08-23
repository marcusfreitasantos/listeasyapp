import { createContext, useState, ReactNode, FC } from "react";
import { ListEntityType } from "../features/listsManager/model/list";

type GlobalListContextType = {
  listsLength: number;
  setListsLength: React.Dispatch<React.SetStateAction<number>>;
  currentList: ListEntityType | null;
  setCurrentList: React.Dispatch<React.SetStateAction<ListEntityType | null>>;
  currentUserLists: ListEntityType[] | [];
  setCurrentUserLists: React.Dispatch<
    React.SetStateAction<ListEntityType[] | []>
  >;
};

export const GlobalListContext = createContext<GlobalListContextType>({
  listsLength: 0,
  setListsLength: () => {},
  currentList: null,
  setCurrentList: () => {},
  currentUserLists: [],
  setCurrentUserLists: () => [],
});

const ListContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [listsLength, setListsLength] = useState(0);
  const [currentList, setCurrentList] = useState<ListEntityType | null>(null);
  const [currentUserLists, setCurrentUserLists] = useState<
    ListEntityType[] | []
  >([]);

  return (
    <GlobalListContext.Provider
      value={{
        listsLength,
        setListsLength,
        currentList,
        setCurrentList,
        currentUserLists,
        setCurrentUserLists,
      }}
    >
      {children}
    </GlobalListContext.Provider>
  );
};

export default ListContextProvider;
