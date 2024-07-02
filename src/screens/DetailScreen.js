import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const DetailScreen = () => {
  const route = useRoute();
  const { item } = route.params;
  const [data, setData] = useState([]);

  useFocusEffect(
    // combo đi chung cho navigation khi focus vào màn hình này thì nó sẽ gọi lại
    React.useCallback(() => {
      getData();
    }, [])
  );

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("orchid");
      setData(JSON.parse(jsonValue) || []);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePressFavorite = async (item) => {
    const updatedData = data.map((section) => {
      return {
        ...section,
        items: section.items.map((orchid) => {
          if (orchid.name === item.name) {
            {
              item.isFavorite = !item.isFavorite;
            }
            return { ...orchid, isFavorite: !orchid.isFavorite };
          }
          return orchid;
        }),
      };
    });

    setData(updatedData);
    await AsyncStorage.setItem("orchid", JSON.stringify(updatedData));
  };
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
      <TouchableOpacity onPress={() => handlePressFavorite(item)}>
        <Ionicons
          name={item.isFavorite ? "heart" : "heart-outline"}
          size={28}
          color={"red"}
        />
      </TouchableOpacity>
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
