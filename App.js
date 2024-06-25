import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import Home from "./src/screens/Home";
import ListOrchid from "./src/screens/ListOrchid";
import { createStackNavigator } from "@react-navigation/stack";
import DetailScreen from "./src/screens/DetailScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="List" component={ListOrchid} />
        <Stack.Screen name="detailOrchid" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
