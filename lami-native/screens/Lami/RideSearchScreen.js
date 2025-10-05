// Start and end location, stops etc.
//After choosing actual end location, take you to the confirm screen - where you choose the ride size and consequntally the price
import React, {useState} from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";


export default function RideSearchScreen({navigation}) {

    const [startAddress, setStartAddress] = useState('')
    const [destinationAddress, setDestinationAddress] = useState('')
    const [locationBody, setLocationBody] = useState({
        "startAddress": ' ',
        "endAddress": ' ',
        "startLatitude": ' ',
        "startLongitude": ' ',

    })
    // The actual API Call
    // Geolocation + setting rest of form values up to POST

    const handleChange =  (name, value) => {
        setLocationBody({
            ...locationBody,
            [name]:value
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


            <Text>Destination address</Text>
            <TextInput
                style={styles.input}
                placeholder="Destination address"
                value={locationBody.endAddress}
                onChangeText={text => handleChange("endAddress", text)}
            />

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