import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
import { updateUser } from "../reducers/user";

export default function LoanedListScreen({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.user.value);
  const profileImage = useSelector((state) => state.user.value.profileImage);
  const objectList = useSelector((state) => state.objectList.value.list) || [];
  const [searchObject, setSearchObject] = useState("");

  const loanedList = objectList.filter(e => e.loanedTo !== "");

  useEffect(() => {
    fetch(
      `https://sherlock-backend.vercel.app/objects/findUserObject/${user._id}`
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

  const handleDelete = (objectName) => {
    fetch(
      `https://sherlock-backend.vercel.app/objects/deleteObject/${user._id}/${objectName}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        data.result && dispatch(removeObjectFromList(objectName));
      });
  };

  const filteredObjectList = loanedList.filter((object) =>
    object.name.includes(searchObject)
  );

  let objectsDisplayed;
  if (filteredObjectList.length > 0) {
    objectsDisplayed = filteredObjectList.map((data, i) => {
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
            <Text style={styles.objectName}>
              {data.name.length >= 16
                ? data.name.slice(0, 16) + "..."
                : data.name}
            </Text>
            <Text style={styles.objectDescription}>
              {data.description.length >= 23
                ? data.description.slice(0, 23) + "..."
                : data.description}
            </Text>
          </View>
          {data.picture === null ? (
            <FontAwesome
              name="camera-retro"
              size={60}
              color="#E9B78E"
              style={styles.pictureIcon}
            />
          ) : (
            <Image style={styles.image} source={{ uri: data.picture }} />
          )}
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
          <TouchableOpacity onPress={() => handleDelete(data.name)}>
            <FontAwesome name="trash-o" size={20} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    });
  } else {
    objectsDisplayed = (
      <View>
        <Text style={styles.objectName}>
          Aucun objet trouvé! Une faute de frappe peut-être?
        </Text>
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
        <SafeAreaView style={styles.objectPanel}>
          <Text style={styles.title}>Mes objets</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un objet"
            placeholderTextColor="grey"
            onChangeText={(text) => setSearchObject(text)}
            value={searchObject}
          />
          <ScrollView showsVerticalScrollIndicator={true}>
            {objectsDisplayed}
          </ScrollView>
        </SafeAreaView>
        <View style={styles.bottomBar}>
            <Button style={styles.backButton} onPress={() => navigation.navigate("TabNavigator", {screen : "Home"})}>
                <FontAwesome name='arrow-left' size={25} color="white"/>
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
    justifyContent: "center",
    alignItems: "center",
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
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
  },

  backButton: {
    width: 70,
    height: 70,
    marginTop: 20,
    marginLeft: 5,
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

  pictureIcon: {
    position: "absolute",
    marginLeft: 260,
    marginTop: 50,
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
    marginLeft: 10,
  },

  sharedWith: {
    position: "absolute",
    marginTop: 95,
    marginLeft: 80,
    fontWeight: "600",
    color: "white",
    fontSize: 20,
  },

  title: {
    color: "white",
    fontSize: 35,
    fontWeight: 800,
    marginBottom: 10,
    textAlign: "center",
  },
  profileImage: {
    height: 50,
    width: 50,
    marginRight: 30,
    borderRadius: 30,
  },
  searchInput: {
    width: "90%",
    height: 50,
    backgroundColor: "#392A1D",
    borderRadius: 10,
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },
});
