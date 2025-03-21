import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Button, Provider } from "@ant-design/react-native";
//import Toast from "react-native-simple-toast";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const showToast = () => {
  //   Toast.show("Nom d'utilisateur ou mot de passe incorrect!", Toast.SHORT, Toast.CENTER);
  // };

  const loginButtonClicked = () => {
    fetch(`https://sherlock-backend.vercel.app/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            updateUser({
              _id: data.connectedUser._id,
              username: data.connectedUser.username,
              password: password,
            })
          );
          setUsername("");
          setPassword("");
          //navigation.navigate("TabNavigator");
          navigation.navigate("Loading");
        } else {
          //showToast();
          console.log("Something went wrong!");
        }
      });
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/SherlockTitre.png")}
          resizeMode="contain"
        />
        <View style={styles.squareContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Nom d'utilisateur..."
            onChangeText={(e) => setUsername(e)}
            value={username}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Mot de passe..."
            secureTextEntry
            onChangeText={(e) => setPassword(e)}
            value={password}
          />
          <Button onPress={() => loginButtonClicked()} style={styles.button}>
            <Text style={styles.buttonConnexion}>Connexion</Text>
          </Button>
        </View>
        <View style={styles.bottomBar} edges={[]}>
          <Button
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome name='arrow-left' size={25} color="white"/>
          </Button>
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9B78E",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: 350,
    height: 350,
    marginBottom: -80,
    marginTop: -50,
  },
  buttonConnexion: {
    color: "#ffffff",
    height: 50,
    fontWeight: "600",
    fontSize: 25,
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 60,
    paddingTop: 15,
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: "#392A1D",
    borderRadius: 10,
  },
  inputField: {
    textAlign: "left",
    fontSize: 20,
    alignItems: "center",
    backgroundColor: "#ffff",
    borderRadius: 10,
    width: "87%",
    height: 60,
    paddingLeft: 15,
    marginBottom: 20,
  },

  squareContainer: {
    backgroundColor: "#8D6C50",
    paddingVertical: 45,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },  

  bottomBar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginLeft : 20,
    marginTop : 120
  },

  backButton: {
    justifyContent : "center",
    alignItems : "center",
    width: 70,
    height: 70,
    marginTop: 20,
    marginLeft: 5,
    backgroundColor: "#392A1D",
    borderRadius : 10,
  },
});
