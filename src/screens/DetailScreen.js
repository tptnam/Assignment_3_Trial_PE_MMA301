import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, StyleSheet, ScrollView, Image } from "react-native";

const DetailScreen = () => {
  const route = useRoute();
  const { item } = route.params;
  console.log(item);
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.label}>
        Weight: <Text style={styles.value}>{item.weight}g</Text>
      </Text>
      <Text style={styles.label}>
        Rating: <Text style={styles.value}>{item.rating}</Text>
      </Text>
      <Text style={styles.label}>
        Price: <Text style={styles.value}>${item.price}</Text>
      </Text>
      <Text style={styles.label}>
        Top of the Week:{" "}
        <Text style={styles.value}>{item.isTopOfTheWeek ? "Yes" : "No"}</Text>
      </Text>
      <Text style={styles.label}>
        Color: <Text style={styles.value}>{item.color}</Text>
      </Text>
      <Text style={styles.label}>
        Bonus: <Text style={styles.value}>{item.bonus}</Text>
      </Text>
      <Text style={styles.label}>
        Origin: <Text style={styles.value}>{item.origin}</Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    fontWeight: "normal",
  },
});
export default DetailScreen;
