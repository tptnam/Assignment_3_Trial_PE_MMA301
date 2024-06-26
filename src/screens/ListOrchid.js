import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { mock } from "../utils/http";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

function ListOrchid() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const fetchOrchid = async () => {
    try {
      const res = await mock.get("category");
      console.log(res.data);

      if (res.data) {
        await AsyncStorage.setItem("orchid", JSON.stringify(res.data));
      } else {
        console.error("Error fetching data:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchOrchid();
  }, []);

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
    <SafeAreaView style={styles.container}>
      {data.length > 0 ? (
        <SectionList
          sections={data.map((section) => ({
            ...section,
            data: section.items,
          }))}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.name}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("detailOrchid", { item })}>
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
          )}
          renderSectionHeader={({ section: { name } }) => (
            <Text style={styles.header}>{name}</Text>
          )}
        />
      ) : (
        <ActivityIndicator />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginVertical: 8,
    padding: 20,
    backgroundColor: "#79CDCD",
    alignItems: "center",
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
    textAlign: "center",
  },
  title: {
    fontSize: 24,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default ListOrchid;
