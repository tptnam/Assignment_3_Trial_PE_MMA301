import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { mock } from "../utils/http";
import { useNavigation } from "@react-navigation/native";

function ListOrchid() {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const fetchOrchid = async () => {
    try {
      const res = await mock.get("category");
      if (res.data) {
        setData(res.data);
      } else {
        console.error("Error: Response data is not structured as expected.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchOrchid();
  }, []);

  // const handlePress = (item) => {
  //   Alert.alert(
  //     item.name,
  //     `Weight: ${item.weight}\nRating: ${item.rating}\nPrice: ${item.price}\nIs Top Of The Week: ${item.isTopOfTheWeek}\nColor: ${item.color}\nBonus: ${item.bonus}\nOrigin: ${item.origin}`
  //   );
  // };

  return (
    <SafeAreaView style={styles.container}>
      {data.length > 0 ? (
        <SectionList
          sections={data.map((section) => ({
            ...section,
            data: section.items, //nhớ đoạn này lấy cục dữ liệu cần lặp lại
          }))}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.name}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("detailOrchid", { item })}>
                <Image source={{ uri: item.image }} style={styles.image} />
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
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
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
