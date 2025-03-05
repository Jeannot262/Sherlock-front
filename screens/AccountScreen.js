import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';


export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
     <Image style={styles.image} source={require('../assets/SherlockTitre.png')} resizeMode="contain"/>

     <View style={styles.squareContainer}>

{/* Button Menu à droite *login4* */}







{/* Button Home */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonRetour}>Retour</Text>
      </TouchableOpacity>

{/* Button Modifier le mot de passe  */}
     <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('')}>
        <Text style={styles.buttonModifier}>Modifier votre mot de passe</Text>
      </TouchableOpacity>

{/* Button Modifier la langue */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('')}>
        <Text style={styles.buttonModifier}>Modifier la langue</Text>
      </TouchableOpacity>

{/* Button Supp le compte */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('First')}>
        <Text style={styles.buttonModifier}>Supprimer le compte</Text>
      </TouchableOpacity>

{/* Button Retour */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonRetour}>Retour</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#E9B78E',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: 350,
    height: 350,
    marginBottom: -80,
    marginTop: -50,
  },
  buttonModifier: {
    color: '#ffffff',
    height: 50,
    fontWeight: '600',
    fontSize: 25,
  },
  button: {
    alignItems: 'center',
      paddingTop: 20,
      width: '55%',
      marginTop: 30,
      backgroundColor: '#392A1D',
      borderRadius: 10,
      marginBottom: 20,
  },
  username: {
    textAlign: 'left',
    backgroundColor: '#ffff',
    borderRadius: 10,
    width: '87%',
    paddingTop: 20,
    marginBottom: 20,
  },
  password: {
    textAlign: 'left',
    backgroundColor: '#ffff',
    borderRadius: 10,
    width: '87%',
    paddingTop: 20,
    marginBottom: 20,
  },
  squareContainer: {
    backgroundColor: '#8D6C50',
    paddingVertical: 45,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    bottom: '-70%',
    left: -10,
    backgroundColor: '#392A1D',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonRetour: {
    color: '#ffffff',
    fontSize: 18,
  },
});