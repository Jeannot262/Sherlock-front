import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removePhoto } from "../reducers/object";

export default function ObjectScreen({ navigation }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const object = useSelector((state) => state.object.value);

  const photo = object.picture;
  return (
    <>
      <View style={styles.container}>
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
        <View style={styles.objectContainer}>
          <View style={styles.row}>
            <Text style={styles.text}>Nom</Text>
            <TextInput
              style={styles.nameInput}
              placeholder="OBJECT NAME"
              placeholderTextColor="#392A1D"
              onChangeText={(e) => setName(e)}
              value={name}
            ></TextInput>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Photo</Text>
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => navigation.navigate("CameraScreen")}
            >
              <Image style={styles.image} source={{ uri: photo }} />
            </TouchableOpacity>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>Description</Text>
            <TextInput
              style={styles.descriptionInput}
              placeholder="OBJECT DESCRIPTION"
              placeholderTextColor="#392A1D"
              multiline={true}
              textAlignVertical="top"
              onChangeText={(e) => setDescription(e)}
              value={description}
            ></TextInput>
          </View>
        </View>
      </View>
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

  objectContainer: {
    width: "98%",
    height: "70%",
    alignItems: "center",
    backgroundColor: "#8c6c51",
    borderRadius: 10,
    marginTop: 20,
    padding: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "98%",
  },

  column: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "98%",
  },

  nameInput: {
    width: "75%",
    fontWeight: "600",
    color: "#392A1D",
    fontSize: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 10,
  },

  descriptionInput: {
    width: "100%",
    height: "45%",
    fontWeight: "500",
    color: "#392A1D",
    fontSize: 15,
    backgroundColor: "white",
    borderRadius: 10,
  },

  text: {
    fontWeight: "600",
    color: "white",
    fontSize: 23,
  },

  objectDescription: {
    fontWeight: "600",
    color: "#dfceb0",
    fontSize: 20,
    marginTop: 10,
  },

  imageContainer: {
    width: 180,
    height: 180,
    // borderWidth : 10,
    // borderColor : "red",
    marginVertical: 30,
  },

  image: {
    width: 180,
    height: 180,
    borderRadius: 10,
  },
});
