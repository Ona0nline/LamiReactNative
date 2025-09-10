import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/Lami/HomeScreen";
import ProfileScreen from "./screens/Lami/ProfileScreen";
import Signup from "./screens/User/SignUp";
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import { StyleSheet, View, SafeAreaView, Image,} from 'react-native';
import Login from "./screens/User/Login";

const stackNavigator = createNativeStackNavigator();

export default function App() {


  const handlePress = () => console.log("Text pressed")
  // require function returns the number  returns the numeric ID of the bundled asset (used internally by React Native)
  return (
      <SafeAreaView style={styles.container}>
          <GestureHandlerRootView style={{ flex: 1 }}>
              <NavigationContainer>
                  <stackNavigator.Navigator initialRouteName="Home" id={"navigation"}>
                      <stackNavigator.Screen name={"Home"} component={HomeScreen}/>
                      <stackNavigator.Screen name={"Profile"} component={ProfileScreen}/>
                      <stackNavigator.Screen name={"Signup"} component={Signup}/>
                      <stackNavigator.Screen name={"Login"} component={Login}/>
                  </stackNavigator.Navigator>
              </NavigationContainer>

          </GestureHandlerRootView>

      </SafeAreaView>

  );


}
const styles = StyleSheet.create(
    {
        container:{
            // Crucial for safe area view
            flex: 1,
            backgroundColor:"white"
        }

    })
