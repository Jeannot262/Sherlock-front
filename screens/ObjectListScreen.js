import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@ant-design/react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import {
  createObjectList,
  updateObjectList,
  removeObjectFromList,
} from "../reducers/objectList";

import { useIsFocused } from "@react-navigation/native";

export default function ObjectListScreen({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.user.value);
  const objectList = useSelector((state) => state.objectList.value.list);

  useEffect(() => {
    fetch(
      `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000/objects/findUserObject/${user._id}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(createObjectList(data.objectList.objects));
        } else {
          console.log("ERROR");
        }
      });
  }, [isFocused]);

  const handleDelete = (objectId) => {
    fetch(
      `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000/objects/deleteObject/${user._id}/${objectId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        data.result && dispatch(removeObjectFromList(objectId));
      });
  };

  let objectsDisplayed;
  if (objectList !== null) {
    objectsDisplayed = objectList.map((data, i) => {
      return (
        <TouchableOpacity
          key={i}
          style={styles.objectContainer}
          onPress={() => {
            navigation.navigate("Object");
            dispatch(
              updateObjectList({
                _id: data._id,
                name: data.name,
                picture: data.picture,
                description: data.description,
                loanedTo: data.loanedTo,
                sharedWith: data.sharedWith,
                owner: data.owner,
              })
            );
          }}
        >
          <View>
            <Text style={styles.objectName}>{data.name}</Text>
            <Text style={styles.objectDescription}>{data.description}</Text>
          </View>
          <Image style={styles.image} source={{ uri: data.picture }} />
          {data.loanedTo !== "" && (
            <Image
              style={styles.blackOpacity}
              source={require("../assets/blackOpacity.png")}
            />
          )}
          {data.loanedTo !== "" && (
            <Image
              style={styles.pipe}
              source={require("../assets/smoking-pipe.png")}
            />
          )}
          <TouchableOpacity onPress={() => handleDelete(data.name)}>
            <FontAwesome name="trash-o" size={20} color="white" />
          </TouchableOpacity>
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
          <Text style={styles.title}>Mes objets</Text>
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
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 120,
    borderBottomWidth: 1,
    borderColor: "#392A1D",
  },

  logo: {
    width: 250,
    height: 100,
    marginLeft: 70,
  },

  accountButton: {
    backgroundColor: "#392A1D",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 80,
    height: 80,
    marginRight: 10,
    marginTop: 15,
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

  objectInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  },

  bottomBar: {
    flexDirection: "row-reverse",
    width: "100%",
    justifyContent: "space-around",
  },

  addButton: {
    width: 300,
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
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 10,
    marginLeft: 235,
    marginTop: 15,
  },

  blackOpacity: {
    position: "absolute",
    width: 121,
    height: 121,
    borderRadius: 10,
    marginLeft: 235,
    marginTop: 15,
  },

  pipe: {
    position: "absolute",
    width: 50,
    height: 50,
    marginTop: 95,
    marginLeft: 310,
  },

  title: {
    color: "white",
    fontSize: 35,
    fontWeight: 800,
    marginBottom: 10,
    textAlign: "center",
  },
});
