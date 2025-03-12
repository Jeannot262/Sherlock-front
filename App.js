import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import objectList from "./reducers/objectList";
import sharedWithUser from "./reducers/sharedWithUser";

import AccountScreen from "./screens/AccountScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import FirstScreen from "./screens/FirstScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ObjectListScreen from "./screens/ObjectListScreen";
import ObjectScreen from "./screens/ObjectScreen";
import NewObjectScreen from "./screens/NewObjectScreen";
import SharedScreen from "./screens/SharedScreen";
import SharedToScreen from "./screens/SharedToScreen";
import CameraScreen from "./screens/CameraScreen";
import CancelShareScreen from "./screens/CancelShareScreen";
import Loading from "./screens/Loading";
import SharedWithMeScreen from "./screens/SharedWithMeScreen";

const store = configureStore({
  reducer: { user, objectList, sharedWithUser },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return(
    <Tab.Navigator screenOptions={({route}) => ({
      tabBarIcon : ({size}) => {
        let iconName = "";
        if(route.name === "Home")
        {
          iconName = "home";
        }
        else if(route.name === "Mes Objets")
        {
          iconName = "cubes";
        }
        else if(route.name === "Partager")
        {
          iconName = "share";
        }
        return(<FontAwesome name={iconName} size={size} color="white"/>);
      },
      tabBarActiveTintColor : "white",
      tabBarInactiveTintColor: '#8D6C50',
      headerShown: false,
      tabBarActiveBackgroundColor : "#8D6C50",
      tabBarInactiveBackgroundColor : "#392A1D",
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Mes Objets" component={ObjectListScreen}/>
      <Tab.Screen name="Partager" component={SharedToScreen}/>
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="First"
        >
          <Stack.Screen name="First" component={FirstScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Object" component={ObjectScreen} />
          <Stack.Screen name="NewObject" component={NewObjectScreen} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator}/>
          <Stack.Screen name="Share" component={SharedScreen}/>
          <Stack.Screen name="CancelShare" component={CancelShareScreen} />
          <Stack.Screen name="Loading" component={Loading}/>
          <Stack.Screen name="SharedWithMe" component={SharedWithMeScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9B78E",
    alignItems: "center",
    justifyContent: "center",
  },
});
