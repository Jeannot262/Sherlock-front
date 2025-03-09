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
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { createObjectList } from "../reducers/objectList";
import { updateObject } from "../reducers/object";

export default function ObjectListScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const object = useSelector((state) => state.object.value);
  const [objectTrigger, setObjectTrigger] = useState(object);
  const [objectList, setObjectList] = useState([]);
  //const [objectDisplayed, setObjectDisplayed] = useState([]);
  //const photo = object.picture;

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
  }, [objectTrigger]);

  const handleDelete = (objectId) => {
    fetch(
      `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000/objects/deleteObject/${user._id}/${objectId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setObjectList(objectList.filter((obj) => obj._id !== objectId));
        } else {
          console.log("ERROR");
        }
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
            dispatch(updateObject({
              name : data.name,
              picture : data.picture,
              description : data.description,
              loanedTo : data.loanedTo,
              sharedWith : data.sharedWith,
              owner : data.owner}));
            }}>
          <View>
            <Text style={styles.objectName}>{data.name}</Text>
            <Text style={styles.objectDescription}>{data.description}</Text>
          </View>
          <Image style={styles.image} source={{uri : data.picture}}/>
          {data.loanedTo !== "" && <Image style={styles.blackOpacity}source={require("../assets/blackOpacity.png")}/>}
          {data.loanedTo !== "" && <Image style={styles.pipe} source={require("../assets/smoking-pipe.png")}/>}
        </TouchableOpacity>
      );
    });
  } 
  else {
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
          {/* <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate("Home")}
            activeOpacity={0.8}
          >
            <Text style={styles.textButton}>Home</Text>
          </TouchableOpacity> */}
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
          {/* <Button
            style={styles.addButton} onPress={() => navigation.navigate("Login")}>
            <FontAwesome name='arrow-left' size={25} color="white"/>
          </Button> */}
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
  },

  accountButton: {
    backgroundColor: "#392A1D",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 80,
    height: 80,
    marginRight : 10,
    marginTop : 15
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
    width: 120,
    height: 120,
    borderRadius: 10,
  },

  blackOpacity: {
    position : "absolute",
    width: 121,
    height: 121,
    borderRadius: 10,
    marginLeft : 235,
    marginTop : 10,
  },

  pipe : {
    position : "absolute",
    width : 45,
    height : 45,
    marginTop : 95,
    marginLeft : 310
  },

  title: {
    color: "white",
    fontSize: 35,
    fontWeight: 800,
    marginBottom: 10,
    textAlign: "center",
  },
  
});
