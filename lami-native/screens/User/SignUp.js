import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import {Button, StyleSheet, Text, TextInput, Platform, ScrollView, KeyboardAvoidingView, Alert} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as TaskManager from 'expo-task-manager';
// For local storage purposes
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

export default function Signup ({navigation}) {

    const [location,setLocation] = useState(null)

    TaskManager.defineTask("ride-tracking-task", ({ data, error }) => {
        if (error) {
            console.error(error);
            return;
        }
        if (data) {
            const { locations } = data;

            // run async stuff in an inner function
            (async () => {
                await AsyncStorage.setItem('userLocation', JSON.stringify(locations));
                console.log("Saved background location:", locations[0]);
            })();
        }
    });


    useEffect(() => {

        const startTracking = async () => {

            let {status} = await Location.requestForegroundPermissionsAsync()
            if (status !== "granted") {
                Alert.alert("Foreground location Permission Denied.", "Please allow this app to have location permission.", [
                    { text: "OK", onPress: () => navigation.navigate('Signup') }
                ])
                return;
            }

            let { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
            if (bgStatus !== "granted") {
                Alert.alert("Background Permission denied", "Please allow this app to have background location permisiion.", [{text:"OK"}])
                return;
            }


            await Location.startLocationUpdatesAsync("ride-tracking-task", {
                accuracy: Location.Accuracy.High,
                distanceInterval: 5,
                showsBackgroundLocationIndicator: true, // iOS only
            });
            console.log("Tracking started:");
        };

        startTracking();

        return () => {
            // stop when ride ends
            Location.stopLocationUpdatesAsync("ride-tracking-task");
        };
        }, [])

    useEffect(() => {
        const fetchStoredLocation = async () => {
            const stored = await AsyncStorage.getItem('userLocation');
            if (stored) {
                setLocation(JSON.parse(stored));
            }
        };

        // poll every 5s, or set up a listener
        const interval = setInterval(fetchStoredLocation, 5000);
        return () => clearInterval(interval);
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
            Alert.alert("Success", "Signup successful");
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

                {/*<Text>Password</Text>*/}
                {/*<TextInput*/}
                {/*    style={styles.input}*/}
                {/*    placeholder="Password"*/}
                {/*    secureTextEntry*/}
                {/*    value={formData.password}*/}
                {/*    onChangeText={(text) => handleChange("password", text)}*/}
                {/*/>*/}

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

                <Text>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Phone number"
                    keyboardType="numeric"
                    value={formData.phone_number}
                    onChangeText={(text) => handleChange("phone_number", text)}
                />

                {/*<Text>Confirm Password</Text>*/}
                {/*<TextInput*/}
                {/*    style={styles.input}*/}
                {/*    placeholder="Confirm password"*/}
                {/*    secureTextEntry*/}
                {/*    value={formData.confirmPassword}*/}
                {/*    onChangeText={(text) => handleChange("confirmPassword", text)}*/}
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