import { useEffect } from "react";
import {
StyleSheet,
Text,
View,
Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import {
createObjectList,
} from "../reducers/objectList";


export default function Loading({navigation}) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    useEffect(() => {
        fetch(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000/objects/findUserObject/${user._id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    dispatch(createObjectList(data.objectList.objects));
                    navigation.navigate("TabNavigator", {screen : "Home"});
                } 
                else 
                {
                    console.log(data.error);
                    navigation.navigate("TabNavigator", {screen : "Home"});
                }
            }
        );
    });

    return(
        <View style={styles.container}>
            <FontAwesome name="key" size={50} color="white"/>
            <Text style={styles.text}>Chargement...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E9B78E",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontWeight: "800",
        color: "white",
        fontSize: 40,
    },
});