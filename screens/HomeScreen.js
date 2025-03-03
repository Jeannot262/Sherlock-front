import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen({navigation}) {
 return (
   <View style={styles.container}>
     <Text>Home Screen</Text>
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
});