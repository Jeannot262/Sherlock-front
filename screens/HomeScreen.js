import React, { useRef, useEffect, useState } from "react";
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

import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../reducers/user";

const { width: screenWidth } = Dimensions.get("window");

// const images = [
//   require("../assets/cable-ethernet.jpg"),
//   require("../assets/jumelles.jpg"),
//   require("../assets/clefs.jpg"),
//   require("../assets/medicaments.jpg"),
//   require("../assets/bijoux.jpg"),
//   require("../assets/perceuse.jpg"),
// ];

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const imageList = useSelector((state) => state.objectList?.value?.list) || [];

  console.log(
    "Redux state:",
    useSelector((state) => state.objectList)
  );

  const [profileImage, setProfileImage] = useState(null);

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);
  const autoScroll = useRef(true);

  useEffect(() => {
    if (!imageList || imageList.length === 0) return;

    const interval = setInterval(() => {
      if (autoScroll.current && flatListRef.current) {
        currentIndex.current = (currentIndex.current + 1) % imageList.length;
        flatListRef.current.scrollToIndex({
          index: currentIndex.current,
          animated: true,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [imageList.length]);

  const logoutPressed = () => {
    dispatch(
      updateUser({
        _id: null,
        username: null,
        password: null,
      })
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  console.log("imagelist=", imageList);
  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            navigation.navigate("Login");
            logoutPressed();
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Logout</Text>
        </TouchableOpacity>
        <Image
          style={styles.logo}
          source={require("../assets/SherlockTitre.png")}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Image
              source={require("../assets/placeholder.png")}
              style={styles.profileImage}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.carouselcontainer}>
        {imageList.length === 0 ? (
          <Text>Aucune image disponible</Text>
        ) : (
          <FlatList
            ref={flatListRef}
            data={imageList}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToAlignment="center"
            snapToInterval={screenWidth * 0.7}
            contentContainerStyle={{
              paddingHorizontal: (screenWidth - screenWidth * 0.7) / 2,
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            onTouchStart={() => (autoScroll.current = false)}
            onMomentumScrollEnd={() => (autoScroll.current = true)}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * screenWidth * 0.7,
                index * screenWidth * 0.7,
                (index + 1) * screenWidth * 0.7,
              ];
              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.8, 1.2, 0.8],
                extrapolate: "clamp",
              });
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.5, 1, 0.5],
                extrapolate: "clamp",
              });
              return (
                <View style={styles.carouselItem}>
                  <Animated.Image
                    source={{ uri: item }}
                    style={[
                      styles.carouselImage,
                      { transform: [{ scale }], opacity },
                    ]}
                    resizeMode="cover"
                  />
                </View>
              );
            }}
          />
        )}
      </View>
      <View style={styles.buttoncontainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MyObjects")}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Mes objets</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Shared")}
          activeOpacity={0.8}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.textButton}>
              Mes prêts
              <Image
                style={styles.imageButton}
                source={require("../assets/smoking-pipe.png")}
                resizeMode="center"
              />
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.PartageButton}
          onPress={() => navigation.navigate("Shared")}
          activeOpacity={0.8}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.textButton}>
              Partager avec Watson
              <Image
                style={styles.imageButton}
                source={require("../assets/black-hat.png")}
                resizeMode="center"
              />
            </Text>
          </View>
        </TouchableOpacity>
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
  logoutButton: {
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
  accountButton: {
    backgroundColor: "#392A1D",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    // padding: 8,
    marginTop: 10,
    height: 60,
    width: 60,
    // marginRight: 30,
  },
  textAccountButton: {
    fontSize: 10,
    color: "white", //"#E9B78E",
    fontWeight: "bold",
  },
  carouselcontainer: {
    height: 220,
    width: "90%",
    backgroundColor: "#9E6D52",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 10,
    paddingTop: 20,
  },
  carouselItem: {
    width: screenWidth * 0.7,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 10,
  },
  carouselImage: {
    width: "90%",
    height: 150,
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
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#392A1D",
    alignItems: "center",
    justifyContent: "center",
    // fontcolor: "white",
    borderRadius: 10,
    padding: 8,
    margin: 10,
    marginBottom: 40,
    height: 90,
    // flexDirection: "row",
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
    height: 100,
  },
  // buttonContent: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  profileImage: {
    height: 40,
    width: 40,
    marginRight: 30,
    borderRadius: 20,
  },
});
