import {ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

export default function ObjectListScreen()
{
    const user = useSelector((state) => state.user.value);
    const objectList = user.objects[0];

    const objectsDisplayed = objectList.map((data, i) => {
        return(
            <View key={i} style={styles.objectContainer}>
                <View>
                    <Text style={styles.objectName}>{data.name}</Text>
                    <Text style={styles.objectDescription}>{data.description}</Text>
                </View>
                <Image style={styles.image} source={require("../assets/placeholder.png")}/>
            </View>
        );
    });
    
    return(
    <>
        <SafeAreaProvider style={styles.container}>
            <SafeAreaView>
                <View>
                    <ScrollView>
                        {objectsDisplayed}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    </>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#E9B78E',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    objectContainer : {
        flexDirection : "row",
        justifyContent : "space-between", 
        width : "90%",
        height : 150,
        padding : 10,
        marginLeft : 10,
        marginRight : 10,
        marginTop : 20,
        marginBottom : 20,
        backgroundColor: '#392A1D',
    },

    objectName : {
        fontWeight : "800",
        fontSize : 30
    },

    image : {
        width : 120,
        height : 120,
    }

});