import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import ListOrchid from "../screens/ListOrchid";
import HomeScreen from "../screens/Home";
import FavScreen from "../screens/FavScreen";

const Tab = createBottomTabNavigator();

function BottomNavigate() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === "List") {
            iconName = focused ? "list" : "list-outline";
          } else if (rn === "FavList") {
            iconName = focused ? "heart" : "heart-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
        tabBarStyle: { padding: 10, height: 70 },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="List" component={ListOrchid} />
      <Tab.Screen name="FavList" component={FavScreen} />
    </Tab.Navigator>
  );
}

export default BottomNavigate;
