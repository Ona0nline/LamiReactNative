import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import {Button, StyleSheet, Text, TextInput, Platform, ScrollView, KeyboardAvoidingView, Alert} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from "axios";
import {URL} from "../../utils/global";

export default function Signup ({navigation}) {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone_number: "",
        password: "",
        confirmPassword: "",
    });


    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    }


    const handleSubmit = async () => {
        try {
            const res = await axios.post(URL + "signup", formData);
            console.log("Signup success:", res.data);
            Alert.alert("Success", "Signup successful", [
                { text: "OK", onPress: () => navigation.navigate('Login') }]);
        } catch (err) {
            console.log(err)
            Alert.alert("Signup error", "Unsuccessful signup attempt. Please try again", [
                { text: "OK", onPress: () => navigation.navigate('Signup') }
            ]);

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

            <Text style={styles.h1}>SignUp form</Text>
                <Text>Fullname:</Text>
                <TextInput
                    style={styles.input}
                    placeholder={"Jane Doe"}
                    value={formData.username}
                    onChangeText={(text) => setFormData({ ...formData, username: text })}
                />


                <Text>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(text) => handleChange("email", text)}
                />

                <Text>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Phone number"
                    keyboardType="numeric"
                    value={formData.phone_number}
                    onChangeText={(text) => handleChange("phone_number", text)}
                />


                <Text>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={formData.password}
                    secureTextEntry
                    onChangeText={text => handleChange("password", text)}
                />

                <Text>Confirm Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    secureTextEntry
                    value={formData.confirmPassword}
                    onChangeText={(text) => handleChange("confirmPassword", text)}
                />


                <Button title="Sign up" onPress={handleSubmit} />

            </ScrollView>
        </KeyboardAwareScrollView>

    )

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
    }
)