import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { Button } from "@ant-design/react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { createObjectList, updateObjectList } from "../reducers/objectList";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SharedScreen({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const user = useSelector(state => state.user.value);
  const objectList = useSelector((state) => state.objectList.value.list);
  const object = useSelector(state => state.objectList.value.object);
  const shareWith = useSelector(state => state.sharedWithUser.value);
  const profileImage = useSelector((state) => state.user.value.profileImage);

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
  
  let objectsDisplayed;
    if (objectList !== null) {
      objectsDisplayed = objectList.map((data, i) => {
        let selected = false;
        return (
          <TouchableOpacity
            key={i}
            style={selected ? selectedObjectContainer : styles.objectContainer}
            onPress={() => {
              selected = !selected;
              dispatch(
                updateObjectList({
                  _id: data._id,
                  name: data.name,
                  picture: data.picture,
                  description: data.description,
                  loanedTo: data.loanedTo,
                  sharedWith: data.sharedWith,
                  owner: data.owner,
                }));
            }}>
            <View>
              <Text style={styles.objectName}>
                {data.name.length >= 16 ? data.name.slice(0, 16) + "..." : data.name}
              </Text>
              <Text style={styles.objectDescription}>
                {data.description.length >= 23 ? data.description.slice(0, 23) + "..." : data.description}
              </Text>
            </View>
            {data.picture === null ? <FontAwesome name="camera-retro" size={60} color="#E9B78E" style={styles.pictureIcon}/> : 
            <Image style={styles.image} source={{ uri: data.picture }} />}
            {data.sharedWith !== "" && (
              <Image
                style={styles.hat}
                source={require("../assets/black-hat.png")}
              />
            )}
            {data.sharedWith !== "" && (
              <Text style={styles.sharedWith}>{data.sharedWith}</Text>
            )}
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
          </TouchableOpacity>
        );
      });
    } else { 
      objectsDisplayed = (
        <View>
          <Text style={styles.objectName}>You haven't stored any object yet!</Text>
        </View>
      );
    }

  const validateButtonClicked = () => {
    fetch(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000/objects/shareWith/${shareWith}`, {
      method : "PUT",
      headers : { "Content-Type" : "application/json"},
      body : JSON.stringify({name : object.name, owner : object.owner})
    })
    .then(response => response.json())
    .then(data => {
      if(data.result)
      {
        console.log("Object Sahred !!", data.update);
        navigation.navigate("TabNavigator", {screen : "Partager"})
      }
      else
      {
        console.log("error");
      }
    });
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/SherlockTitre.png")}
        />
       <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImage}
          />
        ) : (
          <Image style={styles.profileImage} />
        )}
      </TouchableOpacity>
      </View>
      <Text style={styles.title}>Que voulez-vous partager avec {shareWith} ?</Text>
      <Image
        style={styles.imageButton}
        source={require("../assets/black-hat.png")}
        resizeMode="center"
      />
      {/* <View style={styles.searchContainer}>
        <TextInput style={styles.input} placeholder="Rechercher" />
      </View> */}
      <SafeAreaView style={styles.objectPanel}>
        <ScrollView showsVerticalScrollIndicator={true}>
          {objectsDisplayed}
        </ScrollView>
      </SafeAreaView>
      <View style={styles.bottomBar}>
        <Button style={styles.backButton} onPress={() => navigation.navigate("TabNavigator", {screen : "Partager"})}>
          <FontAwesome name='arrow-left' size={25} color="white"/>
        </Button>
        <Button
        style={styles.addButton}
        onPress={() => validateButtonClicked()}>
          <Text style={styles.objectName}>Valider</Text>
        </Button>
      </View>
    </SafeAreaProvider>
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
    marginRight: 10,
    marginTop: 15,
  },

  textButton: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },

  title: {
    color: "black",
    fontSize: 25,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: 800,
  },
  resultTitle: {
    color: "white",
    fontSize: 25,
    fontWeight: "odor",
    marginBottom: 20,
    textAlign: "center",
  },

  searchContainer: {
    backgroundColor: "white",
    alignItems: "justify",
    justifyContent: "center",
    fontcolor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 10,
    marginBottom: 20,
    width: "90%",
    height: 40,
  },

  objectPanel: {
    width: "98%",
    height: "45%",
    backgroundColor: "#8c6c51",
    borderRadius: 10,
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

  selectedObjectContainer : {
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
    borderWidth : 5,
    borderColor : "white"
  },

  scrollView: {
    alignItems: "center",
    paddingBottom: 20,
  },
  
  objectDescription: {
    fontWeight: "600",
    color: "#dfceb0",
    fontSize: 20,
    marginTop: 10,
  },

  pictureIcon : {
    position : "absolute",
    marginLeft : 260,
    marginTop : 50
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
 
  hat: {
    position: "absolute",
    width: 60,
    height: 50,
    marginTop: 90,
    marginLeft:10,
  },

  sharedWith : {
    position : "absolute",
    marginTop: 95,
    marginLeft: 80,
    fontWeight: "600",
    color: "white",
    fontSize: 20,
  },
  
  imageButton: {
    width: 100,
    height: 100,
  },

  objectName: {
    fontWeight: "800",
    color: "white",
    fontSize: 30,
  },

  bottomBar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  addButton: {
    width: 300,
    height: 70,
    marginTop: 20,
    marginRight : 10,
    backgroundColor: "#392A1D",
  },

  backButton: {
    width: 70,
    height: 70,
    marginTop: 20,
    marginLeft: 5,
    backgroundColor: "#392A1D",
  },
  profileImage: {
    height: 50,
    width: 50,
    marginRight: 30,
    borderRadius: 30,
  },
});
