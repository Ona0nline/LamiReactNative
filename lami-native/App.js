import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";

import { StyleSheet, View, SafeAreaView, Image,} from 'react-native';

const stackNavigator = createNativeStackNavigator();

export default function App() {


  const handlePress = () => console.log("Text pressed")
  // require function returns the number  returns the numeric ID of the bundled asset (used internally by React Native)
  return (
      <NavigationContainer>
          <stackNavigator.Navigator initialRouteName="Home">
              <stackNavigator.Screen name={"Home"} component={HomeScreen}/>
              <stackNavigator.Screen name={"Profile"} component={ProfileScreen}/>
          </stackNavigator.Navigator>
      </NavigationContainer>
  );
}
