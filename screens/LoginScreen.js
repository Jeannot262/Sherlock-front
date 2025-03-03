import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';


export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
     <Image style={styles.image} source={require('../assets/SherlockTitre.png')} resizeMode="contain"/>
     <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonConnexion}>Connexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9B78E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 350,
    height: 350,
    marginTop: -200,
  },
  buttonConnexion: {
    color: '#ffffff',
    height: 50,
    fontWeight: '600',
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
      paddingTop: 8,
      width: '80%',
      marginTop: 30,
      backgroundColor: '#ec6e5b',
      borderRadius: 10,
      marginBottom: 80,
  }
});