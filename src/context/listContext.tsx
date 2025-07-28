import { createContext, useState, ReactNode, FC } from "react";
import { ListEntityType } from "../features/listsManager/model/list";

type GlobalListContextType = {
  listsLength: number;
  setListsLength: React.Dispatch<React.SetStateAction<number>>;
  currentList: ListEntityType | null;
  setCurrentList: React.Dispatch<React.SetStateAction<ListEntityType | null>>;
};

export const GlobalListContext = createContext<GlobalListContextType>({
  listsLength: 0,
  setListsLength: () => {},
  currentList: null,
  setCurrentList: () => {},
});

const ListContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [listsLength, setListsLength] = useState(0);
  const [currentList, setCurrentList] = useState<ListEntityType | null>(null);

  return (
    <GlobalListContext.Provider
      value={{ listsLength, setListsLength, currentList, setCurrentList }}
    >
      {children}
    </GlobalListContext.Provider>
  );
};

export default ListContextProvider;
