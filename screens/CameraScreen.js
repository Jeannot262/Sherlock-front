import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { addPhoto } from "../reducers/objectList";

const BACKEND_ADDRESS = `https://sherlock-backend.vercel.app`;

export default function CameraScreen() {
  const [permission, setPermission] = useState(false);
  const [facing, setFacing] = useState("back");
  const [flash, setFlash] = useState("off");
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      setPermission(result && result.status === "granted");
    })();
  }, []);

  const toggleCamera = () => {
    setFacing((status) => (status === "back" ? "front" : "back"));
  };

  const toggleFlash = () => {
    setFlash((status) => (status === "off" ? "on" : "off"));
  };

  if (!permission || !isFocused) {
    return <View />;
  }

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.3 });
    const formData = new FormData();
    const uri = photo?.uri;
    console.log(uri);

    formData.append("photoFromFront", {
      uri: uri,
      type: "image/jpeg",
      name: "photo.jpg",
    });

    fetch(`${BACKEND_ADDRESS}/objects/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        data.result && dispatch(addPhoto(data.url));
      });
  };

  return (
    <CameraView
      style={styles.cameraview}
      facing={facing}
      flash={flash}
      ref={(ref) => (cameraRef.current = ref)}
    >
      <SafeAreaView style={styles.topContainer}>
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => toggleFlash()}
        >
          <FontAwesome
            name="flash"
            size={25}
            color={flash === "on" ? "#392A1D" : "#8D6C50"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => toggleCamera()}
        >
          <FontAwesome name="rotate-right" size={25} color="#8D6C50" />
        </TouchableOpacity>
      </SafeAreaView>
      <TouchableOpacity
        style={styles.pictureButton}
        onPress={() => takePicture()}
      >
        <FontAwesome name="circle-thin" size={95} color="#E9B78E" />
      </TouchableOpacity>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  cameraview: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },

  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 50,
    paddingHorizontal: 30,
  },

  smallButton: {
    width: 60,
    height: 60,
    backgroundColor: "#E9B78E",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },

  pictureButton: {
    width: 100,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
