import * as React from 'react';
import {View, Text, Button, StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";

// The page that will have your curr location as UI, and have the sliding about thing (Lami -> LamiLux -> LamiTaxi)
// Also have the button to take you to the profile page
export default function HomeScreen({navigation}) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const checkLogin = async () => {
            const token = await AsyncStorage.getItem("loggedInState"); // or any flag you set
            if (token === "true") {
                setIsLoggedIn(true);
            }
        };

        checkLogin();
    }, []);

    return (
        <View>

            {isLoggedIn ? (
                <>
                <Text style={styles.h1}>Welcome back!</Text>
                <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
                </>

            ) : (
                <>
                    <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
                    <Button title="Login" onPress={() => navigation.navigate('Login')} />
                    {/*Upon hitting profile button, API GET request must be hit to get the users profile details*/}

                </>
            )}
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

