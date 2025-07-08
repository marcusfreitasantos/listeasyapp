import { View, Text } from "react-native";
import { useContext, useState } from "react";
import { GlobalUserContext } from "@/src/context/userContext";
import { Button } from "@/src/components/button";
import { userLogout } from "@/src/services/firebase/auth";
import { useRouter } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";

const ListsView = () => {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useContext(GlobalUserContext);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {isLoading ? (
        <ActivityIndicator color={theme.primaryColor} />
      ) : (
        <View>
          <Text>
            Lists of user: {currentUser?.user?.displayName} |{" "}
            {currentUser?.user?.email}{" "}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ListsView;
