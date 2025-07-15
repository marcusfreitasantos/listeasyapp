import { useContext } from "react";
import { GlobalListContext } from "@/src/context/listContext";
import * as S from "./styles";
import { InputField } from "@/src/components/inputField";

export const SingleListView = () => {
  const { currentList } = useContext(GlobalListContext);

  if (!currentList) return null;

  return (
    <S.ListView>
      <S.ListName>{currentList.title}</S.ListName>

      <InputField
        placeholder="Pesquisar item"
        iconName="search"
        onChangeText={(t) => console.log(t)}
      />
    </S.ListView>
  );
};
