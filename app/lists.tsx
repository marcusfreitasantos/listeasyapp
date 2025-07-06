import { View, Text } from "react-native";
import { useContext } from "react";
import { GlobalUserContext } from "@/src/context/userContext";

const Lists = () => {
  const { user } = useContext(GlobalUserContext);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>
        Lists of user: {user?.user.displayName} | {user?.user.email}{" "}
      </Text>
    </View>
  );
};

export default Lists;
