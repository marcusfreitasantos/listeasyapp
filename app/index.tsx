import { Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const Home = () => {
  return (
    <TouchableOpacity
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      onPress={() => router.push("/details" as any)}
    >
      <Text>Homeeee</Text>
    </TouchableOpacity>
  );
};

export default Home;
