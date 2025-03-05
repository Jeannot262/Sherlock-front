import React, { useRef, useEffect } from "react";
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

export default function SharedScreen({ navigation }) {
  //     const object = objectData.map((data, i) => {
  //       return (
  //         <View key={i} style={styles.card}>
  //           <Text style={styles.name}>{data.name}</Text>
  //         </View>
  //       );

  //   });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
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
          resizeMode="contain"
        />

        {/* <TouchableOpacity
          style={styles.accountButton}
          onPress={() => navigation.navigate("Account")}
          activeOpacity={0.8}
        >
          <Text style={styles.textAccountButton}>Account</Text>
        </TouchableOpacity>
       */}
      </View>
      <Text style={styles.title}>Que Voulez vous partager?</Text>
      <Image
        style={styles.imageButton}
        source={require("../assets/black-hat.png")}
        resizeMode="center"
      />
      <View style={styles.searchContainer}>
        <TextInput style={styles.input} placeholder="Rechercher" />
      </View>
      <View style={styles.objectContainer}>
        <Text style={styles.resultTitle}>Résultat</Text>
        <ScrollView contentContainerStyle={styles.scrollView}></ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 10,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
  homeButton: {
    backgroundColor: "#392A1D",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    // padding: 8,
    marginTop: 10,
    height: 40,
    width: 100,
  },
  logo: {
    width: 225,
    height: 75,
    marginTop: 10,
  },
  //   accountButton: {
  //     backgroundColor: "#392A1D",
  //     alignItems: "center",
  //     justifyContent: "center",
  //     borderRadius: 20,
  //     // padding: 8,
  //     marginTop: 10,
  //     height: 60,
  //     width: 60,
  //     // marginRight: 30,
  //   },
  textButton: {
    fontSize: 20,
    color: "white", //"#E9B78E",
    fontWeight: "bold",
  },

  container: {
    flex: 1,
    backgroundColor: "#E9B78E",
    alignItems: "center",
    justifyContent: "center",
    fontcolor: "white",
  },
  title: {
    color: "black",
    fontSize: 25,
    fontWeight: "odor",
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  resultTitle: {
    color: "white",
    fontSize: 25,
    fontWeight: "odor",
    marginBottom: 20,
    textAlign: "center",
  },
  logo: {
    width: 225,
    height: 75,
    marginTop: 10,
  },

  searchContainer: {
    backgroundColor: "white",
    alignItems: "justify",
    justifyContent: "center",
    fontcolor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 10,
    marginBottom: 40,
    width: "90%",
    height: 40,
  },
  objectContainer: {
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

  scrollView: {
    alignItems: "center",
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    backgroundColor: "#ffffff",
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    // width: "65%",
    marginTop: 6,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    fontSize: 16,
  },
  imageButton: {
    width: 100,
    height: 100,
  },
});
