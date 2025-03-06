import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@ant-design/react-native";

import { useDispatch, useSelector } from "react-redux";
import { createObjectList } from "../reducers/objectList";

export default function ObjectListScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [objectList, setObjectList] = useState([]);
  const object = useSelector((state) => state.object.value);
  const photo = object.picture;

  useEffect(() => {
    fetch(
      `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000/objects/findUserObject/${user._id}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(createObjectList(data.objectList.objects));
          setObjectList(data.objectList.objects);
        } else {
          console.log("ERROR");
        }
      });
  }, []);

  let objectsDisplayed;
  if (objectList !== null) {
    objectsDisplayed = objectList.map((data, i) => {
      return (
        <TouchableOpacity
          key={i}
          style={styles.objectContainer}
          onPress={() => navigation.navigate("Object")}
        >
          <View>
            <Text style={styles.objectName}>{data.name}</Text>
            <Text style={styles.objectDescription}>{data.description}</Text>
          </View>
          <Image style={styles.image} source={{ uri: photo }} />
        </TouchableOpacity>
      );
    });
  } else {
    objectsDisplayed = (
      <View>
        <Text>You haven't stored any object yet!</Text>
      </View>
    );
  }

  return (
    <>
      <SafeAreaProvider style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate("Home")}
            activeOpacity={0.8}
          >
            <Text style={styles.textButton}>Home</Text>
          </TouchableOpacity>
          <Image
            style={styles.logo}
            source={require("../assets/SherlockTitre.png")}
          />
          <TouchableOpacity
            style={styles.accountButton}
            onPress={() => navigation.navigate("Account")}
            activeOpacity={0.8}
          >
            <Text style={styles.textButton}>Account</Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView style={styles.objectPanel}>
          <ScrollView showsVerticalScrollIndicator={true}>
            {objectsDisplayed}
          </ScrollView>
        </SafeAreaView>
        <View style={styles.bottomBar}>
          <Button
            style={styles.addButton}
            onPress={() => navigation.navigate("NewObject")}
          >
            <Text style={styles.objectName}>+</Text>
          </Button>
          <Button
            style={styles.addButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.objectName}>Back</Text>
          </Button>
        </View>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9B78E",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 120,
    borderBottomWidth: 1,
    borderColor: "#392A1D",
  },

  logo: {
    width: 200,
    height: 50,
  },

  homeButton: {
    backgroundColor: "#392A1D",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: 60,
    height: 40,
    width: 100,
  },

  accountButton: {
    backgroundColor: "#392A1D",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: 60,
    height: 40,
    width: 100,
  },

  textButton: {
    fontWeight: "800",
    color: "white",
    fontSize: 20,
  },

  objectPanel: {
    width: "98%",
    height: "70%",
    backgroundColor: "#8c6c51",
    borderRadius: 10,
    marginTop: 20,
  },

  objectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    height: 150,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#392A1D",
    borderRadius: 10,
  },

  bottomBar: {
    flexDirection: "row-reverse",
    width: "100%",
    justifyContent: "space-around",
  },

  addButton: {
    width: 70,
    height: 70,
    marginTop: 20,
    backgroundColor: "#392A1D",
  },

  objectName: {
    fontWeight: "800",
    color: "white",
    fontSize: 30,
  },

  objectDescription: {
    fontWeight: "600",
    color: "#dfceb0",
    fontSize: 20,
    marginTop: 10,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
});
