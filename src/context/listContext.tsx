import { createContext, useState, ReactNode, FC } from "react";

type GlobalListContextType = {
  listsLength: number;
  setListsLength: React.Dispatch<React.SetStateAction<number>>;
};

export const GlobalListContext = createContext<GlobalListContextType>({
  listsLength: 0,
  setListsLength: () => {},
});

const ListContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [listsLength, setListsLength] = useState(0);

  return (
    <GlobalListContext.Provider value={{ listsLength, setListsLength }}>
      {children}
    </GlobalListContext.Provider>
  );
};

export default ListContextProvider;
