import { View, Text } from "react-native";
import { useContext, useState } from "react";
import { GlobalUserContext } from "@/src/context/userContext";
import { Button } from "@/src/components/button";
import { userLogout } from "@/src/services/firebase/auth";
import { useRouter } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";
import { SampleLists } from "@/src/mocks/lists";
import { ListCard } from "../components/listCard";
import { ListEntityType } from "../model/list";
import { FlatList } from "react-native-gesture-handler";

const ListsView = () => {
  const router = useRouter();
  const { currentUser } = useContext(GlobalUserContext);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const [currentUserLists, setCurrentUserLists] = useState<
    ListEntityType[] | []
  >(SampleLists);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {isLoading ? (
        <ActivityIndicator color={theme.primaryColor} />
      ) : (
        <FlatList
          data={currentUserLists}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ListCard list={item} />}
        />
      )}
    </View>
  );
};

export default ListsView;
