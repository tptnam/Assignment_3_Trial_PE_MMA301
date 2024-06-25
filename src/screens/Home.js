import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          navigation.navigate("List");
        }}>
        Welcome to the Home screen!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
