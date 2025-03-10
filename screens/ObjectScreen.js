import { StyleSheet, Switch, Text, Image, TouchableOpacity, TextInput, View } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from "react-native-simple-toast";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {Button} from "@ant-design/react-native";

import { useState } from "react";
import { useSelector } from "react-redux";
import { updateObject, removePhoto } from "../reducers/object";
import { updateObjectList } from "../reducers/objectList";

export default function ObjectScreen({ navigation }) {
  const object = useSelector((state) => state.objectList.value.object);
  const objectPicture = object.picture;
  const [name, setName] = useState(object.name);
  const [description, setDescription] = useState(object.description);
  const [loaned, setLoaned] = useState(object.loanedTo !== "" ? true : false);
  const [loanedTo, setLoanedTo] = useState(object.loanedTo);

  const showUpdateToast = () => {
    Toast.show("Objet Modifié!", Toast.SHORT, Toast.CENTER);
  };

  const showErrorToast = () => {
    Toast.show("Donnez un nom et une description à votre objet!", Toast.SHORT, Toast.CENTER);
  };

  const loanSwitch = () => {
    setLoaned(!loaned)
    setLoanedTo("");
  };

  const validateButtonPressed = () => {
    fetch(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000/objects/updateObject/${object.owner}/${object._id}`, {
      method : "PUT",
      headers : { "Content-Type" : "application/json"},
      body : JSON.stringify({name : name, picture : objectPicture, description : description, loanedTo : loanedTo})
    })
    .then(response => response.json())
    .then(data => {
      if(data.result)
      {
        // console.log(data.update);
        // console.log(object._id)
        showUpdateToast();
        dispatch(updateObjectList(data.object));
      }
      else
      {
        console.log(data.error);
        showErrorToast();
      }
    })
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.logo} source={require("../assets/SherlockTitre.png")}/>
          <TouchableOpacity
          style={styles.accountButton}
          onPress={() => navigation.navigate("Account")}
          activeOpacity={0.8}>
            <Text style={styles.textButton}>Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.objectContainer} edges={[]}>
          <View style={styles.row} edges={[]}>
            <Text style={styles.text}>Nom</Text>
            <TextInput 
            style={styles.nameInput} 
            placeholder="Nouvel Objet" 
            placeholderTextColor="grey" 
            onChangeText={(e) => setName(e)} 
            value={name}>
            </TextInput>
          </View>
          <View style={styles.pictureRow} edges={[]}>
            <Text style={styles.text}>Photo</Text>
            <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate("CameraScreen")}>
              <Image style={styles.image} source={{uri : objectPicture}}/>
            </TouchableOpacity>
          </View>
          <View style={styles.column} edges={[]}>
            <Text style={styles.text}>Description</Text>
            <TextInput 
            style={styles.descriptionInput} 
            placeholder="Où est situé l'objet?" 
            placeholderTextColor="grey" 
            multiline={true} 
            textAlignVertical='top'
            onChangeText={(e) => setDescription(e)} 
            value={description}>                      
            </TextInput>
          </View>
          <SafeAreaProvider>
            <SafeAreaView style={styles.row} edges={[]}>
                <Text style={styles.text}>Prêté?</Text>
                <Image style={styles.pipe} source={loaned ? require("../assets/smoking-pipe.png") : require("../assets/darker-pipe.png")}/>
                <Switch
                trackColor={{false : "grey", true : "#392A1D"}}
                thumbColor={loaned ? "#E9B78E" : "white"}
                style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                onValueChange={() => loanSwitch()}
                value = {loaned}/>
            </SafeAreaView>
          </SafeAreaProvider>
          {loaned && <TextInput
            style={styles.loanInput} 
            placeholder="A qui avez-vous prêté l'objet?" 
            placeholderTextColor="grey" 
            onChangeText={(e) => setLoanedTo(e)} 
            value={loanedTo}>
          </TextInput>}
        </View>
        <View style={styles.bottomBar} edges={[]}>
          <Button style={styles.backButton} onPress={() => navigation.navigate("TabNavigator", {screen : "MyObjects"})}>
            <FontAwesome name='arrow-left' size={25} color="white"/>
          </Button>
          <Button style={styles.validateButton} onPress={() => validateButtonPressed()}>
            <Text style={styles.objectName}>Valider</Text>
          </Button>
        </View>
      </View>
    </>
  );
}
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9B78E',
    justifyContent: 'center',
    alignItems: 'center',
  },
    
  header : {
    flexDirection : "row",
    justifyContent : "space-between",
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
     
  accountButton: {
    backgroundColor: "#392A1D",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 70,
    height: 70,
    marginRight : 10,
    marginTop : 15
  },
    
  textButton : {
    fontWeight : "800",
    color  :"white",
    fontSize : 20
  },
    
  objectContainer : {
    width : "98%",
    height : "70%",
    justifyContent : "center",
    alignItems : "center",
    backgroundColor: "#8c6c51",
    borderRadius : 10,
    marginTop : 20,
    paddingHorizontal : 10,
    paddingVertical : 10
  },
    
  row : {
    flexDirection : "row",
    justifyContent : "space-between",
    alignItems : "center",
    width : "98%",
    marginVertical : 10,
  },
    
  pictureRow : {
    flexDirection : "row",
    justifyContent : "space-between",
    alignItems : "center",
    width : "98%",
    height : 180,
    marginVertical : 10,
  },
    
  column : {
    justifyContent : "flex-start",
    alignItems : "flex-start",
    width : "98%",
    height : 180,
    marginVertical : 10,
  },
    
  nameInput : {
    width : "75%",
    fontWeight : "600",
    color : "#392A1D",
    fontSize : 20, 
    backgroundColor : "white",
    borderRadius : 20,
    paddingLeft : 10,
  },
    
  descriptionInput : {
    width : "100%",
    height : "75%",
    fontWeight : "500",
    color : "#392A1D",
    fontSize : 15, 
    backgroundColor : "white",
    borderRadius : 10,
  },
    
  loanInput : {
    width : "75%",
    height : 40,
    fontWeight : "600",
    color : "#392A1D",
    fontSize : 18, 
    backgroundColor : "white",
    borderRadius : 10,
    paddingLeft : 10,
    paddingTop : 10,
  },
    
  text : {
    fontWeight : "600",
    color  :"white",
    fontSize : 23
  },
    
  objectName : {
    fontWeight : "800",
    color  :"white",
    fontSize : 30
  },
    
  objectDescription : {
    fontWeight : "600",
    color  :"#dfceb0",
    fontSize : 20,
    marginTop : 10,
  },
    
  imageContainer : {
    width : 185,
    height : 185,
    borderRadius : 10,
    borderWidth : 2,
    borderColor : "white",
    marginVertical : 30,
  },
    
  image : {
    width : 180,
    height : 180,
    borderRadius : 10,
    // borderWidth : 2,
    // borderColor : "red",
  },
    
  pipe : {
    width : 40,
    height : 40,
  },
    
  bottomBar : {
    flexDirection : "row",
    width : "100%",
    justifyContent : "space-between",
    alignItems : "flex-end",
  },
    
  validateButton : {
    width : 280,
    height : 80,
    marginTop : 20,
    marginRight : 15,
    backgroundColor : "#392A1D",
  },
    
  backButton : {
    width : 70,
    height : 70,
    marginTop : 20,
    marginLeft : 5,
    backgroundColor : "#392A1D",
  },
});
