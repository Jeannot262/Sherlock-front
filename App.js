import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import object from "./reducers/object";
import objectList from "./reducers/objectList";

import AccountScreen from "./screens/AccountScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import FirstScreen from "./screens/FirstScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ObjectListScreen from "./screens/ObjectListScreen";
import ObjectScreen from "./screens/ObjectScreen";
import NewObjectScreen from "./screens/NewObjectScreen";
import SharedScreen from "./screens/SharedScreen";
import CameraScreen from "./screens/CameraScreen";

const store = configureStore({
  reducer: { user, object, objectList },
});

const Stack = createNativeStackNavigator();

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
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Shared" component={SharedScreen} />
          <Stack.Screen name="MyObjects" component={ObjectListScreen} />
          <Stack.Screen name="Object" component={ObjectScreen} />
          <Stack.Screen name="NewObject" component={NewObjectScreen} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
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
