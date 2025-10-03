import * as React from 'react';
import {View, Text, Button, StyleSheet, Alert} from "react-native";
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

// The page that will have your curr location as UI, and have the sliding about thing (Lami -> LamiLux -> LamiTaxi)
// Also have the button to take you to the profile page
export default function HomeScreen({navigation}) {

    const [location,setLocation] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [region, setRegion] = useState(null);

    TaskManager.defineTask("ride-tracking-task", ({ data, error }) => {
        if (error) {
            console.error(error);
            return;
        }
        if (data) {
            const { locations } = data;
            const latest = locations[0];
            setLocation(latest);
            (async () => {
                await AsyncStorage.setItem('userLocation', JSON.stringify(latest));
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
            console.log("Tracking started");
        };

        startTracking();

        return () => {
            // stop when ride ends, idk how I would determine htis though
            Location.stopLocationUpdatesAsync("ride-tracking-task");
        };
    }, [])


    useEffect(() => {
        const fetchStoredLocation = async () => {
            const stored = await AsyncStorage.getItem('userLocation');
            if (stored) {
                setLocation(JSON.parse(stored));
                console.log(stored)
            }
        };

        const interval = setInterval(fetchStoredLocation, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect( () =>{
        // async function syntax == (async () => {})()
        // (async () => {})() is just an anonymous async function that runs immediately.
        // It’s mostly used when you need await in a place where the parent function can’t be async (like useEffect).
        (async () => {
            let location = AsyncStorage.getItem('userLocation')
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                // zoom level
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });

        })();
    }, [])

    if (!region) return null;

    // Homescreen only loads if user is logged in
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

                </>
            )}

        {/*    Map*/}
            <View>
                <MapView
                    style={styles.map}
                    region={region}
                    showsUserLocation={true}>
                    <Marker coordinate={region} title="You are here" />
                </MapView>
            </View>
        </View>

    );


}
const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            backgroundColor:"white"
        },

        map: { flex: 1 },

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

