import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from 'react-redux';


export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const dispatch = useDispatch()

  const handleLogin = () => {
    navigation.navigate("Home");
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setProfileImage(selectedImageUri);

      dispatch(updateUser({ profileImage: selectedImageUri }));
    }
  };
    
  return (
    <View style={styles.container}>
      {/* Image du titre */}
      <Image
        style={styles.image}
        source={require("../assets/SherlockTitre.png")}
        resizeMode="contain"
      />

      {/* Bouton pour ouvrir le menu */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.menuButton}
      >
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>

      {/* Burger Menu */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.menuContainer}>
            {/* Titre du menu */}
            <Text style={styles.menuTitle}>Menu</Text>

            {/* Items du menu */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.goBack("NewObject")}
            >
              <Text style={styles.menuItemText}>Nouvel objet</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.goBack("")}
            >
              <Text style={styles.menuItemText}>Mes prêts</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.goBack("MyObjects")}
            >
              <Text style={styles.menuItemText}>Mes objets</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Section des boutons */}
      <View style={styles.squareContainer}>
        {/* Bouton Home */}
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.goBack("Home")}>
          <Text style={styles.buttonHome}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={pickImage}>
          <Text style={styles.buttonPhoto}>Modifier votre photo de profil</Text>
        </TouchableOpacity>

        {/* Bouton Modifier le mot de passe */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("")}>
          <Text style={styles.buttonModifier}>Modifier votre mot de passe</Text>
        </TouchableOpacity>

        {/* Bouton Modifier la langue */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("")}>
          <Text style={styles.buttonModifier}>Modifier la langue</Text>
        </TouchableOpacity>

        {/* Bouton Supprimer le compte */}
        <TouchableOpacity
          style={styles.suppbutton}
          onPress={() => navigation.navigate("First")}>
          <Text style={styles.buttonModifier}>Supprimer le compte</Text>
        </TouchableOpacity>

        {/* Bouton Retour */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonRetour}>Retour</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9B78E",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  menuContainer: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: "#392A1D",
    width: 150,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: 225,
    height: 80,
    marginTop: 30,
  },
  buttonModifier: {
    color: "#ffffff",
    height: 50,
    fontWeight: "600",
    fontSize: 20,
  },
  button: {
    alignItems: "center",
    paddingTop: 20,
    width: "85%",
    marginTop: 30,
    backgroundColor: "#392A1D",
    borderRadius: 10,
    marginBottom: 20,
  },
  suppbutton: {
    alignItems: "center",
    paddingTop: 20,
    width: "85%",
    marginTop: 30,
    backgroundColor: "#9F6D52",
    borderRadius: 10,
    marginBottom: 20,
  },
  username: {
    textAlign: "left",
    backgroundColor: "#ffff",
    borderRadius: 10,
    width: "87%",
    paddingTop: 20,
    marginBottom: 20,
  },
  password: {
    textAlign: "left",
    backgroundColor: "#ffff",
    borderRadius: 10,
    width: "87%",
    paddingTop: 20,
    marginBottom: 20,
  },
  squareContainer: {
    backgroundColor: "#8D6C50",
    paddingVertical: 0,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    marginTop: 50,
  },
  backButton: {
    bottom: "-40%",
    right: 130,
    backgroundColor: "#392A1D",
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonRetour: {
    color: "#ffffff",
    fontSize: 18,
    top: -150,
  },
  homeButton: {
    top: -100,
    right: 130,
    backgroundColor: "#392A1D",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  buttonHome: {
    color: "#ffffff",
    fontSize: 18,
  },
  menuButton: {
    position: "absolute",
    top: 65,
    right: 35,
  },
  menuText: {
    fontSize: 24,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  menuItem: {
    paddingVertical: 8,
  },
  menuItemText: {
    fontSize: 14,
    color: "white",
  },
  buttonPhoto: {
    color: "#ffffff",
    height: 50,
    fontWeight: "600",
    fontSize: 20,
  }
});