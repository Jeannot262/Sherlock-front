import React from "react";
import { useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function FirstScreen({ navigation }) {

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none"
      }
    });
    return () => navigation.getParent()?.setOptions({
      tabBarStyle: undefined
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Image
        style={styles.image}
        source={require("../assets/SherlockTitre.png")}
        resizeMode="contain"
      />
      <View style={styles.buttoncontainer}>
        <Text style={styles.title}>
          Bienvenue sur Sherlock! Sherlock et Watson vous aideront à ranger et à
          retrouver vos objets
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Signup")}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Créer un compte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.googlebutton}
          onPress={() => navigation.navigate("Profile")}
          activeOpacity={0.8}
        >
          <Text style={styles.textgoogleButton}>
            <Image
              style={styles.imageButton}
              source={require("../assets/image 2.png")}
              resizeMode="contain"
            />
            Continuer avec Google
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9B78E",
    alignItems: "center",
    justifyContent: "center",
    fontcolor: "white",
  },
  title: {
    color: "white",
    fontSize: 25,
    fontWeight: "odor",
    marginBottom: 20,
    textAlign: "center",
  },
  image: {
    width: 350,
    height: 200,
    marginTop: 10,
  },
  imageButton: {
    width: 30,
    height: 30,
  },
  buttoncontainer: {
    flex: 1,
    backgroundColor: "#8D6C50",
    alignItems: "justify",
    justifyContent: "center",
    fontcolor: "white",
    borderRadius: 10,
    width: "90%",
    padding: 10,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#392A1D",
    alignItems: "center",
    justifyContent: "center",
    // fontcolor: "white",
    borderRadius: 10,
    padding: 8,
    margin: 10,
    height: 80,
  },
  googlebutton: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    fontcolor: "black",
    borderRadius: 10,
    // padding: 8,
    margin: 10,
    height: 50,
    marginTop: 40,
  },
  textButton: {
    color: "white",
    fontSize: 26,
    fontWeight: "600",
  },
  textgoogleButton: {
    color: "black",
    fontSize: 20,
    fontWeight: "600",
    paddingBottom: 10,
  },
});
