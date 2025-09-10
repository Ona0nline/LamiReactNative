import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import {Button, StyleSheet, Text, TextInput, Platform, ScrollView, KeyboardAvoidingView} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// For local storage purposes
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

export default function Signup () {

    const [location,setLocation] = useState(null)

    useEffect(() => {
        const fetchLocation = async () => {
            // Check if location is already stored
            const storedLocation = await AsyncStorage.getItem('userLocation');
            if (storedLocation) {
                setLocation(JSON.parse(storedLocation));
                return; // we already have it
            }

            // If not, ask permission and get location
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission denied');
                return;
            }

            const loc = await Location.getCurrentPositionAsync({});
            setLocation(loc);
            await AsyncStorage.setItem('userLocation', JSON.stringify(loc));
            console.log(loc);
        };

        fetchLocation();
    }, []);

    useEffect(() => {
        if (location) {
            setFormData(prev => ({
                ...prev,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                placeName: "deprecated need"
            }));
        }
    }, [location]);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone_number: "",
        password: "",
        confirmPassword: "",
        latitude: "",
        longitude: "",
        placeName: ""
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
            const res = await axios.post("http://20.20.90.70:9090/signup", formData);
            console.log("Signup success:", res.data);
        } catch (err) {
            console.error("Signup error:", err);
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
                    secureTextEntry
                    value={formData.password}
                    onChangeText={(text) => handleChange("password", text)}
                />

                <Text>Confirm Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    secureTextEntry
                    value={formData.confirmPassword}
                    onChangeText={(text) => handleChange("confirmPassword", text)}
                />

                {/*<Text>Latitude</Text>*/}
                {/*<TextInput*/}
                {/*    style={styles.input}*/}
                {/*    placeholder="Latitude"*/}
                {/*    keyboardType="numeric"*/}
                {/*    value={formData.latitude}*/}
                {/*    onChangeText={(text) => handleChange("latitude", text)}*/}
                {/*/>*/}

                {/*<Text>Longitude</Text>*/}
                {/*<TextInput*/}
                {/*    style={styles.input}*/}
                {/*    placeholder="Longitude"*/}
                {/*    keyboardType="numeric"*/}
                {/*    value={formData.longitude}*/}
                {/*    onChangeText={(text) => handleChange("longitude", text)}*/}
                {/*/>*/}

                {/*<Text>Place Name</Text>*/}
                {/*<TextInput*/}
                {/*    style={styles.input}*/}
                {/*    placeholder="Place name"*/}
                {/*    value={formData.placeName}*/}
                {/*    onChangeText={(text) => handleChange("placeName", text)}*/}
                {/*/>*/}

                <Button title="Sign up" onPress={handleSubmit} />

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