// Has your curr location, user end location input, returns, db info about who's on the way + db info about which ranks have your desired end location
// "Choosing" a taxi -> Shows you the maps ui of the street + info.

import {Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {use, useState} from "react";
import axios from "axios";
import {URL} from "../../utils/global";

export default function () {
    // Only the taxi rank name but the coords need to be retained to display the route.
    // Need destination address for ranks, and start address for routes
    const [ranksFound, setRanksFound] = useState(null);
    const [taxiRanks, setTaxiRanks] = useState([])
    const [address, setAddress] = useState({
        "address":""
    });


    const handleChange = (name, value) => {
        setAddress({
            ...address,
            [name]:value
        })
    }

    const getTaxiRanks = async() => {
        console.log("We're here")
        try{
            const response = await axios.post("http://20.20.90.148:9090" + "/taxi/ranks", {"address" :address.address});
            console.log("API Response: ", response.data)
            Alert.alert("Success!", "Click OK to see list of available drivers near you.", [{text:"OK"}])
            setTaxiRanks(response.data);
            setRanksFound(true)

        }catch (err){
            console.log(err)
        }

    }

    return(
        <View style={styles.container}>
            <Text style={styles.h3}>Start Address</Text>
            <TextInput
                style={styles.input}
                placeholder="Start address"

            />

            <TouchableOpacity style={styles.submit}>
                <Text style={styles.buttonText}>Submit Start Address</Text>
            </TouchableOpacity>


            <Text style={styles.h3}>Destination address</Text>
            <TextInput
                style={styles.input}
                placeholder="Destination address"
                value={address.address}
                onChangeText={(text) => handleChange("address", text)}
            />


            <TouchableOpacity style={styles.submit} onPress={getTaxiRanks}>
                <Text style={styles.buttonText}>Submit End Address</Text>
            </TouchableOpacity>

            <View>
                {
                    ranksFound ?
                        <View>
                            {taxiRanks.map((rank, index) => (
                                <Text style={styles.h3} key={index}>{rank.name}</Text>
                            ))}
                        </View>
                        :
                        ''
                        // Alert.alert("No Taxi Ranks", "There are no taxi ranks that have your destination location :(", [{text:"OK"}])
                }
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#28282B',
    },
    map: {
        flex: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: "#FDE12D",
        padding: 8,
        marginVertical: 6,
        borderRadius: 4,
        backgroundColor:'grey',
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
    h3: {
        fontSize: 16,
        fontWeight: '400',
        marginLeft: 15,
        color:'white'
    },
    submit:{
        width: 200,
        paddingVertical: 6,
        paddingHorizontal: 50,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor:'#FFA500'

    },
    buttonText: {
        width:300,
        fontWeight: '600',
        fontSize: 16,
        flexShrink: 1,
        textAlign: 'center',
        numberOfLines: 1,
    },
    search:{
        width: 200,
        paddingVertical: 6,
        paddingHorizontal: 50,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor:'#FDE12D',
        marginTop:40
    },
    text:{
        color:"#FFF"
    }


});

