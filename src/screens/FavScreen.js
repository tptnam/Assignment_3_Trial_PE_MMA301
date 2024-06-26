import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function FavScreen() {
  const [data, setData] = useState([]);
  const navigate = useNavigation();

  const getData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("orchid");
      return JSON.parse(storedData) || [];
    } catch (error) {
      console.log("Error fetching data:", error);
      return [];
    }
  };

  useFocusEffect(
    // useFocusEffect khi chuyển về màn hình mới gọi
    // combo đi chung cho navigation khi focus vào màn hình này thì nó sẽ gọi lại
    // useCallback giúp tránh việc render lại khi không cần thiết
    React.useCallback(() => {
      const fetchAsyncStorage = async () => {
        const storedData = await getData();
        setData(storedData);
      };
      fetchAsyncStorage();
    }, [])
  );

  const handlePressFavorite = async (item) => {
    const updatedData = data.map((section) => ({
      ...section,
      items: section.items.map((orchid) =>
        orchid.name === item.name
          ? { ...orchid, isFavorite: !orchid.isFavorite }
          : orchid
      ),
    }));

    setData(updatedData);
    await AsyncStorage.setItem("orchid", JSON.stringify(updatedData));
  };

  const handleRemoveAllFavorites = async () => {
    Alert.alert(
      "Remove All Favorites",
      "Are you sure you want to remove all favorite items?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove All",
          style: "destructive",
          onPress: async () => {
            const clearedData = data.map((section) => ({
              ...section,
              items: section.items.map((orchid) => ({
                ...orchid,
                isFavorite: false,
              })),
            }));

            setData(clearedData);
            await AsyncStorage.setItem("orchid", JSON.stringify(clearedData));
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <TouchableOpacity
        onPress={() => navigate.navigate("detailOrchid", { item })}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePressFavorite(item)}>
        <Ionicons
          name={item.isFavorite ? "heart" : "heart-outline"}
          size={28}
          color={"red"}
        />
      </TouchableOpacity>
    </View>
  );

  const favItems = data.flatMap((section) =>
    section.items.filter((item) => item.isFavorite)
  );

  return (
    <View style={styles.container}>
      {favItems.length > 0 ? (
        <>
          <FlatList
            data={favItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.name + index}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleRemoveAllFavorites}>
            <Text style={styles.buttonText}>Remove All Favorites</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>No favorite orchids</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  button: {
    backgroundColor: "red",
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default FavScreen;
