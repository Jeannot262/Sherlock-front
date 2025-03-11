import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TextInput,
  } from "react-native";
import { Button } from "@ant-design/react-native";
  
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSharedWithUser } from "../reducers/sharedWithUser";

  
  export default function SharedToScreen({ navigation }) {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.value.username);
    const [searchedUser, setSearchedUser] = useState("");

    const validateButtonPressed = () => {
        if(searchedUser !== user)
        {
            fetch(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000/users/findUser/${searchedUser}`)
            .then(response => response.json())
            .then(data => {
                if(data.result)
                {
                    dispatch(updateSharedWithUser(data.user))
                    setSearchedUser("");
                    navigation.navigate("Share");
                }
                else
                {
                    console.log(data.error);
                }
            });
        }
        else
        {
            console.log("Cannot share an object with yourself!")
        }
    };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/SherlockTitre.png")}
          />
          <TouchableOpacity
          style={styles.accountButton}
          onPress={() => navigation.navigate("Account")}
          activeOpacity={0.8}>
            <Text style={styles.textButton}>Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
            <Text style={styles.title}>Avec qui voulez-vous partager vos objets?</Text>
            <Image
            style={styles.imageButton}
            source={require("../assets/black-hat.png")}
            resizeMode="center"
            />
            <TextInput 
            style={styles.input} 
            placeholder="Chercher un utilisateur"
            placeholderTextColor="grey"
            onChangeText={(e => setSearchedUser(e))} 
            value={searchedUser}/>
            <Button
            style={styles.validateButton}
            onPress={() => validateButtonPressed()}>
              <Text style={styles.validateText}>Valider</Text>
            </Button>
        </View>
        <View style={styles.bottomBar}>
          <Button
          style={styles.cancelButton}
          onPress={() => navigation.navigate("CancelShare")}>
            <Text style={styles.cancelText}>Annuler un Partage</Text>
          </Button>
        </View>
      </View>
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
      color: "white",
      fontSize: 30,
      fontWeight: 800,
      marginBottom: 20,
      textAlign: "center",
      fontWeight: "bold",
    },
  
    input: {
        width: "95%",
        fontWeight: "600",
        color: "#392A1D",
        fontSize: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingLeft: 10,
        marginVertical : 20,
    },
   
    imageButton: {
      width: 100,
      height: 100,
    },

    body : {
        width: "98%",
        height: "70%",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#8c6c51",
        borderRadius: 10,
        marginTop: 20,
        paddingHorizontal: 10,
        paddingVertical: 70,
    },
  
    
    bottomBar: {
      flexDirection: "row-reverse",
      width: "100%",
      justifyContent: "space-around",
    },
    
    validateText: {
      fontWeight: "800",
      color: "white",
      fontSize: 30,
    },

    validateButton: {
      width: 300,
      height: 70,
      marginTop: 20,
      backgroundColor: "#392A1D",
    },

    cancelText: {
      fontWeight: "800",
      color: "white",
      fontSize: 22,
      textAlign : "center"
    },

    cancelButton: {
      width: 200,
      height: 65,
      marginTop: 20,
      backgroundColor: "#392A1D",
    },
  });
  