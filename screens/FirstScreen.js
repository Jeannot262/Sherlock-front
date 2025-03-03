import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function FirstScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/SherlockTitre.png")}
        resizeMode="contain"
      />
      <View style={styles.buttoncontainer}>
        <Text>
          Bienvenue sur Sherlock! Sherlock et Watson vous aideront à ranger et à
          retrouver vos objets
        </Text>
        <Button
          style={styles.button}
          title="Créer un compte"
          onPress={() => navigation.navigate("Signin")}
        />
        <Button
          style={styles.button}
          title="Se connecter"
          onPress={() => navigation.navigate("Login")}
        />
        <Button
          style={styles.googlebutton}
          title="Continuer avec Google"
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
    </View>
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
  image: {
    width: 350,
    height: 200,
  },
  buttoncontainer: {
    flex: 1,
    backgroundColor: "#8D6C50",
    alignItems: "center",
    justifyContent: "center",
    fontcolor: "white",
  },
  button: {
    backgroundColor: "#392A1D",
    alignItems: "center",
    justifyContent: "center",
    fontcolor: "white",
    borderRadius: 10,
  },
  googlebutton: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    fontcolor: "black",
    borderRadius: 10,
  },
});
