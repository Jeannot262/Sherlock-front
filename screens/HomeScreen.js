import React, { useRef, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  FlatList,
  Animated,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { width: screenWidth } = Dimensions.get("window");

const images = [
  require("../assets/cable-ethernet.jpg"),
  require("../assets/jumelles.jpg"),
  require("../assets/clefs.jpg"),
];

export default function HomeScreen({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);
  const autoScroll = useRef(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoScroll.current && flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: currentIndex.current,
          animated: true,
        });
        currentIndex.current =
          currentIndex.current === images.length - 1
            ? 0
            : currentIndex.current + 1;
      }
    }, 3000);

    return () => clearInterval(interval);
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate("Logout")}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Logout</Text>
        </TouchableOpacity>
        <Image
          style={styles.logo}
          source={require("../assets/SherlockTitre.png")}
          resizeMode="contain"
        />
      </View>
      <View style={styles.carouselcontainer}>
        <FlatList
          ref={flatListRef}
          data={images}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          renderItem={({ item }) => (
            <View style={styles.carouselItem}>
              <Image
                source={item}
                style={styles.carouselImage}
                resizeMode="cover"
              />
            </View>
          )}
        />
      </View>
      <View style={styles.buttoncontainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Objets")}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Mes objets</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Prets")}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>
            Mes prêts
            <Image
              style={styles.imageButton}
              source={require("../assets/smoking-pipe.png")}
              resizeMode="contain"
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.PartageButton}
          onPress={() => navigation.navigate("Partager")}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>
            Partager avec Watson
            <Image
              style={styles.imageButton}
              source={require("../assets/black-hat.png")}
              resizeMode="contain"
            />
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  carouselcontainer: {
    height: 200,
    width: "90%",
    backgroundColor: "#9E6D52",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 10,
    paddingTop: 20,
  },
  carouselItem: {
    width: screenWidth * 0.6,
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: (screenWidth * 0.1) / 2,
  },
  carouselImage: {
    width: "100%",
    height: "90%",
    borderRadius: 10,
  },
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
  logo: {
    width: 225,
    height: 75,
    marginTop: 10,
  },
  imageButton: {
    width: 60,
    height: 60,
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

  textButton: {
    color: "white",
    fontSize: 26,
    fontWeight: "600",
  },
  PartageButton: {
    backgroundColor: "#9F6D52",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 8,
    margin: 10,
    height: 80,
  },
  logoutButton: {
    backgroundColor: "#392A1D",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    // padding: 8,
    // margin: 10,
    height: 50,
    width: 100,
  },
});
