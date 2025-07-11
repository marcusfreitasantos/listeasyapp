import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";
import { SampleLists } from "@/src/mocks/lists";
import { ListCard } from "../components/listCard";
import { ListEntityType } from "../model/list";
import { FlatList } from "react-native-gesture-handler";
import * as S from "./styles";
import { InputField } from "@/src/components/inputField";

const ListsView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const [currentUserLists, setCurrentUserLists] = useState<
    ListEntityType[] | []
  >(SampleLists);

  return (
    <S.ListViewWrapper>
      {isLoading ? (
        <ActivityIndicator color={theme.primaryColor} />
      ) : (
        <>
          <InputField placeholder="Pesquisar" iconName="search" />

          <FlatList
            data={currentUserLists}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ListCard list={item} />}
          />
        </>
      )}
    </S.ListViewWrapper>
  );
};

export default ListsView;
