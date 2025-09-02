import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Platform,
  View, SafeAreaView, Image, 
  TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, 
  Button, Alert, Dimensions } from 'react-native';
import { useImageDimensions, useDeviceOrientation } from '@react-native-community/hooks';

export default function App() {

  const handlePress = () => console.log("Text pressed")
  // require function returns the number  returns the numeric ID of the bundled asset (used internally by React Native)
  return (
    <SafeAreaView style={{
      backgroundColor: "#fff",
      // nB screen color wont change until you add flex properrty
      flex:1,
      // Defines what axis we are on
      flexDirection: "row", 
      // Will change for the main axis
      justifyContent: "center",
      // Will change for secondary axis, aka vertical within each line
      alignItems: "center",
      // Align content only works if you have wrapping, aligns thewhole content
      alignContent: "center",
      flexWrap: "wrap"
    }}>

      <View
      style={{
        backgroundColor: "orange",
        // Flex basis sets the width/height depending on what the main axis is
        flexBasis:100,
        height:100
      }}/>

      <View
      style={{
        backgroundColor: "tomato",
        width:100,
        height:100,
      }}/>

      <View
      style={{
        backgroundColor: "purple",
        width:100,
        height:100
      }}/>



    </SafeAreaView>
   
  );
}

const containerStyle = {
  backgroundColor:"orange"
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
