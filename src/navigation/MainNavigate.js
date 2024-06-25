import React from "react";
import DetailScreen from "../screens/DetailScreen";
import ListOrchid from "../screens/ListOrchid";
import BottomNavigate from "./BottomNavigate";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Nav" component={BottomNavigate} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="List" component={ListOrchid} />
      <Stack.Screen name="detailOrchid" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
