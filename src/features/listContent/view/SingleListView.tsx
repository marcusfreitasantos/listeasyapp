import { Text } from "react-native";
import * as S from "./styles";
import { useLocalSearchParams } from "expo-router";

export const SingleListView = () => {
  const params = useLocalSearchParams();

  return (
    <S.ListView>
      <Text>SIngle list: {params.id}</Text>
    </S.ListView>
  );
};
