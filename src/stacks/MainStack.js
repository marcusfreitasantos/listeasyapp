import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import List from "../screens/List";
import MainScreen from "../screens/MainScreen";
import PurchaseScreen from "../screens/PurchaseScreen";

const Stack = createNativeStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="MainScreen"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="MainScreen" component={MainScreen} />
    <Stack.Screen name="List" component={List} />
    <Stack.Screen name="PurchaseScreen" component={PurchaseScreen} />
  </Stack.Navigator>
);
