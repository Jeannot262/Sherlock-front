import React, { useRef, useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  FlatList,
  Animated,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../reducers/user";
import {
  updateObjectList,
  deleteObjectList,
  resetObject,
} from "../reducers/objectList";

const { width: screenWidth } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const profileImage = useSelector((state) => state.user.value.profileImage);

  console.log(
    "Redux state:",
    useSelector((state) => state.objectList)
  );
  const objectList =
    useSelector((state) => state.objectList?.value?.list) || [];

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);
  const autoScroll = useRef(true);

  useEffect(() => {
    if (!objectList || objectList.length === 0) return;

    const interval = setInterval(() => {
      if (autoScroll.current && flatListRef.current) {
        currentIndex.current = (currentIndex.current + 1) % objectList.length;
        flatListRef.current.scrollToIndex({
          index: currentIndex.current,
          animated: true,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [objectList.length]);

  const logoutPressed = () => {
    dispatch(resetObject());
    dispatch(deleteObjectList());
    dispatch(resetUser());
  };

  const navigateToObject = (object) => {
    dispatch(updateObjectList(object));
    navigation.navigate("Object", { object });
  };
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
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Account")}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={require("../assets/compte-utilisateur-1.png")}
                style={styles.profileImage}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={styles.username}>Bienvenue {user.username}</Text>
      </View>
      <View style={styles.carouselcontainer}>
        {objectList.length === 0 ? (
          <Text>Aucune image disponible</Text>
        ) : (
          <FlatList
            ref={flatListRef}
            data={objectList}
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
                <TouchableOpacity
                  style={styles.carouselItem}
                  onPress={() => navigateToObject(item)}
                >
                  <Animated.Image
                    source={{ uri: item.picture }}
                    style={[
                      styles.carouselImage,
                      { transform: [{ scale }], opacity },
                    ]}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loanedButton}
          onPress={() => navigation.navigate("LoanedList")}>
          <Text style={styles.textButton}>Mes prêts</Text>
          <Image style={styles.icon} source={require("../assets/smoking-pipe.png")}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sharedButton}
          onPress={() => navigation.navigate("SharedWithMe")}>
          <Text style={styles.textButton}>Partagés avec moi</Text>
          <Image style={styles.icon} source={require("../assets/black-hat.png")} resizeMode="center"/>
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
    marginTop: 10,
    height: 60,
    width: 60,
  },
  textAccountButton: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
  },
  carouselcontainer: {
    height: 400,
    width: "90%",
    backgroundColor: "#9E6D52",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
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
    height: 320,
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
  icon: {
    position : "absolute",
    width: 50,
    height: 50,
    marginLeft : 240
  },

  buttonContainer: {
    flex: 1,
    backgroundColor: "#8D6C50",
    alignItems: "center",
    justifyContent: "center",
    fontcolor: "white",
    borderRadius: 10,
    width: "90%",
    padding: 10,
    marginBottom: 15,
  },
  loanedButton: {
    backgroundColor: "#392A1D",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 10,
    padding: 8,
    width : "90%",
    height: 70,
  },

  sharedButton: {
    backgroundColor: "#9F6D52",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 10,
    padding: 8,
    width : "90%",
    height: 70,
  },

  textButton: {
    color: "white",
    fontSize: 25,
    fontWeight: "600",
    marginLeft: 10
  },
  profileImage: {
    height: 50,
    width: 50,
    marginRight: 30,
    borderRadius: 30,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
  },
  username: {
    // marginBottom: 20,
    fontSize: 30,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 17,
  },
});
