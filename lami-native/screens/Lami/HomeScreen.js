import * as React from 'react';
import {View, Text, Button, StyleSheet} from "react-native";

// The page that will have your curr location as UI, and have the sliding about thing (Lami -> LamiLux -> LamiTaxi)
// Also have the button to take you to the profile page
export default function HomeScreen({navigation}) {

    return (
        <View>
            <Text style={styles.h1}>Lami Home</Text>
            <Button title={"Sign Up"} onPress={() => navigation.navigate('Signup')} />
            <Button title={"Login"} onPress={() => navigation.navigate('Login')}/>
        </View>

    );


}
const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            backgroundColor:"white"
        },

        input:{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 8,
            marginVertical: 6,
            borderRadius: 4
        },
        h1: {
            fontSize: 32,
            fontWeight: 'bold',
        },
        h2: {
            fontSize: 24,
            fontWeight: '600',
        },
    })

