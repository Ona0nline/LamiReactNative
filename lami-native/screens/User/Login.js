import React, {useState,} from 'react';
import {Button, StyleSheet, Text, TextInput, Platform, ScrollView, KeyboardAvoidingView, Alert} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {URL} from "../../utils/global";


import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login ({navigation}) {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,     // keep all the old data
            [name]: value    // but update (or add) the field that changed
        });
    }

    // NB Axios isn't installed on this system yet, placeholder values

    const handleSubmit = async () => {
        try {
            const res = await axios.post( URL + "login", formData);
            console.log("Login success:", res.data);
            const token = res.data
            Alert.alert("Success", "Login successful", [
                { text: "OK", onPress: () => navigation.navigate('Home') }
            ]);
            await AsyncStorage.setItem('loggedInState', JSON.stringify(true));
            await AsyncStorage.setItem('token', token)
            // Attach header for future calls
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (err) {
            console.error("Login error:", err);
            await AsyncStorage.setItem('loggedInState', JSON.stringify(false));

        }
    };

    return(
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            enableOnAndroid={true}
            extraScrollHeight={20} // space above the input
            keyboardShouldPersistTaps="handled"
        >
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {/*    instead of label it's text andinstead of input it's textinput*/}

                <Text style={styles.h1}>Login</Text>

                <Text>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(text) => handleChange("email", text)}
                />


                <Text>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={formData.password}
                    onChangeText={(text) => handleChange("password", text)}
                />


                <Button title="Login" onPress={handleSubmit} />

            </ScrollView>
        </KeyboardAwareScrollView>

    )


}

// objects of all your styles
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
    }
)