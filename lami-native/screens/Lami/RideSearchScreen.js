// Start and end location, stops etc.
//After choosing actual end location, take you to the confirm screen - where you choose the ride size and consequntally the price
import React, {useState} from "react";
import {Alert, Button, StyleSheet, Text, TextInput, View} from "react-native";
import * as Location from 'expo-location';
import axios from "axios";


export default function RideSearchScreen({navigation}) {

    const [ridesFound, setRidesFound] = useState(false)
    const [rideMetaData, setRideMetaData] = useState({
        "distance": 0,
        "duration":0,
        "fare":' '
    })

    const [driverDetails, setDriverDetails] = useState({
        "drivername": ' ',
        "number_plate":' ',
        "perks":' ',
        "driverLocation": ' ',
        "startLocation":' ',
        "endlocation":' '
    })

    const [locationBody, setLocationBody] = useState({
        "startAddress": ' ',
        "endAddress": ' ',
        "startLatitude": 0,
        "startLongitude": 0,

    })

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

    const availiableRides = async () => {
        await geolocationStart();
        await geolocationEnd();
        console.log("Sending location body: " + JSON.stringify(locationBody))
        try {
            const response = await axios.post("http://20.20.90.148:9090/lami/available-rides",locationBody)
            console.log("API Response: ", response.data)
            Alert.alert("Success!", "Click OK to see list of available drivers near you.", [{text:"OK"}])
            setRidesFound(true)

            setRideMetaData({"distance": response.data.distanceMatrixResponseDTO.distance,
                                   "duration": response.data.distanceMatrixResponseDTO.duration,
                                   "fare": response.data.distanceMatrixResponseDTO.fare
                                    })

            setDriverDetails({
                // UPDATE --> FOR LOOP HERE
                "drivername": response.data.nearbyDrivers[0].drivername,
                "number_plate": response.data.nearbyDrivers[0].licensePlate,
                "perks": response.data.nearbyDrivers[0].perks,
                "driverLocation": response.data.nearbyDrivers[0].placeName,
                "startLocation": response.data.nearbyDrivers[0].userStart,
                "endlocation": response.data.nearbyDrivers[0].userEnd
            })

        }catch (err){
            Alert.alert("Ride Search Failure", "OOPS! Looks like there no drivers near you!", [{text:"OK", onPress: () => navigation.navigate('RideSearch')}])
            console.log(err)
        }

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

            <Button title={"Search for available drivers"} onPress={availiableRides}/>

            <View>
                {
                    ridesFound ? (
                        <View>
                            <View>
                                <Text>Ride fare: {rideMetaData.fare}</Text>
                                <Text>Ride Duration: {rideMetaData.duration}</Text>
                                <Text>Ride Distance: {rideMetaData.distance}</Text>
                            </View>

                            <View>
                                <Text>Driver Details:</Text>
                                <Text>Driver name: {driverDetails.drivername}</Text>
                                <Text>License Plate: {driverDetails.number_plate}</Text>
                                <Text>Perks: {driverDetails.perks}</Text>
                                {/*Soon this will allow for editting, endpoint doesnt exist yet*/}
                                <Text>Your start location: {driverDetails.startLocation}</Text>
                                <Text>Your chosen end location: {driverDetails.endlocation}</Text>

                            </View>

                        </View>



                    ) : (
                        ''
                        // Alert.alert("No rides near you.", "Please try again later", [{text:"OK"}])
                    )
                }
            </View>

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