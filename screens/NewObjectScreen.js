import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';

export default function NewObjectScreen({navigation}) {

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                    style={styles.homeButton}
                    onPress={() => navigation.navigate("Home")}
                    activeOpacity={0.8}>
                        <Text style={styles.textButton}>Home</Text>
                    </TouchableOpacity>
                    <Image style={styles.logo} source={require("../assets/SherlockTitre.png")}/>
                    <TouchableOpacity
                    style={styles.accountButton}
                    onPress={() => navigation.navigate("Account")}
                    activeOpacity={0.8}>
                        <Text style={styles.textButton}>Account</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.objectContainer}>
                    <Text style={styles.objectName}>OBJECT NAME</Text>
                    <Text style={styles.objectDescription}>OBJECT DESCRIPTION</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9B78E',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    header : {
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
        width : "100%",
        height : 120,
        borderBottomWidth : 1,
        borderColor : "#392A1D"
    },

    logo: {
        width: 200,
        height: 50,
    },

    homeButton: {
        backgroundColor: "#392A1D",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        width : 60,
        height: 40,
        width: 100,
    },

    accountButton: {
        backgroundColor: "#392A1D",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        width : 60,
        height: 40,
        width: 100,
    },

    textButton : {
        fontWeight : "800",
        color  :"white",
        fontSize : 20
    },

    objectContainer : {
        width : "98%",
        height : "80%",
        backgroundColor: "#8c6c51",
        borderRadius : 10,
        marginTop : 20,
    },
});