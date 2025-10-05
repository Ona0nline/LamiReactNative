// Start and end location, stops etc.
//After choosing actual end location, take you to the confirm screen - where you choose the ride size and consequntally the price
import React, {useState} from "react";
import {Alert, Button, StyleSheet, Text, TextInput, View} from "react-native";
import * as Location from 'expo-location';


export default function RideSearchScreen({navigation}) {

    const [locationBody, setLocationBody] = useState({
        "startAddress": ' ',
        "endAddress": ' ',
        "startLatitude": 0,
        "startLongitude": 0,

    })
    // The actual API Call
    // Geolocation + setting rest of form values up to POST

    const handleChange =  (name, value) => {

        setLocationBody({
            ...locationBody,
            [name]:value
        })

    }

    const geolocationStart = async () =>{
        const geolocatedStart = await Location.geocodeAsync(locationBody.startAddress)
        if (geolocatedStart.length === 0) {
            Alert.alert('Error', 'Address not found. Try a more specific address.');
            return null;
        }
        const startLatitude = geolocatedStart[0].latitude
        const startLongitude = geolocatedStart[0].longitude

        console.log("Start Latitude: " + startLatitude + " Longitude: " + startLongitude)

        setLocationBody({
            ...locationBody,
            'startLatitude':startLatitude,
            'startLongitude':startLongitude,
        })

    }

    const geolocationEnd = async () =>{
        const geolocatedEnd = await Location.geocodeAsync(locationBody.endAddress)
        if (geolocatedEnd.length === 0) {
            Alert.alert('Error', 'Address not found. Try a more specific address.');
            return null;
        }
        const endLatitude = geolocatedEnd[0].latitude
        const endLongitude = geolocatedEnd[0].longitude

        console.log("End Latitude: " + endLatitude + " Longitude: " + endLongitude)

        setLocationBody({
            ...locationBody,
            'endLatitude':endLatitude,
            'endLongitude':endLongitude
        })

    }


    return(
        <View>
            <Text>Start Address</Text>
            <TextInput
                style={styles.input}
                placeholder="Start address"
                value={locationBody.startAddress}
                onChangeText={(text) => handleChange("startAddress", text)}
            />
            {/*MVP Purposes*/}
            <Button title={"Submit Start Address"} onPress={geolocationStart}/>


            <Text>Destination address</Text>
            <TextInput
                style={styles.input}
                placeholder="Destination address"
                value={locationBody.endAddress}
                onChangeText={text => handleChange("endAddress", text)}
            />
            <Button title={"Submit End Address"} onPress={geolocationEnd}/>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    map: {
        flex: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 6,
        borderRadius: 4,
    },
    h1: {
        fontSize: 32,
        fontWeight: 'bold',
        padding: 10,
    },
    h2: {
        fontSize: 24,
        fontWeight: '600',
    },
});