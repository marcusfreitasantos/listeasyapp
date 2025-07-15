import { useContext } from "react";
import { GlobalListContext } from "@/src/context/listContext";
import { Text } from "react-native";
import * as S from "./styles";

export const SingleListView = () => {
  const { currentList } = useContext(GlobalListContext);

  if (!currentList) return null;

  return (
    <S.ListView>
      <Text>SIngle list: {currentList.title}</Text>
    </S.ListView>
  );
};
