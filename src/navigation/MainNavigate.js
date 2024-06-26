import React from "react";
import DetailScreen from "../screens/DetailScreen";
import ListOrchid from "../screens/ListOrchid";
import BottomNavigate from "./BottomNavigate";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";
import FavScreen from "../screens/FavScreen";

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Nav"
        component={BottomNavigate}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="List" component={ListOrchid} />
      <Stack.Screen name="detailOrchid" component={DetailScreen} />
      <Stack.Screen name="FavList" component={FavScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
