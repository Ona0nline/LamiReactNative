// Must have editable email and username
import React, {useState} from "react";
import {Alert, Button, StyleSheet, Text, TextInput, View} from "react-native";
import axios from "axios";
import {URL} from "../../utils/global";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Body to expect -> field to change, value == input
export default function EditProfile({navigation}){

    const [usernameText, setUsernameText] = useState("");
    const [emailText, setEmailText] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (field, text) =>{
        try {
            const token = await AsyncStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const body = {
                tochange: field,
                value: text
            };
            const response = await axios.put(URL + "update", body);
            Alert.alert("Success", `Successfully edited ${field}!`);
        } catch (err) {
            Alert.alert("Failure", `Error editting ${field}.`);
            console.log(err);
        }
    }

    return (
            <View >
                <Text style={styles.label}>Username</Text>
                {/*Remove text after submitting*/}
                <TextInput style={styles.input}
                   placeholder="Edit Username"
                   onChangeText={(text) => setUsernameText(text)}
                />
                <Button title="Submit" onPress={() => handleSubmit("username", usernameText)} />

                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input}
                           placeholder="Edit Email"
                           onChangeText={(text) => setEmailText(text)}
                />
                <Button title="Submit" onPress={() => handleSubmit("email", emailText)}/>

                <Text style={styles.label}>Phone Number</Text>
                <TextInput style={styles.input}
                           keyboardType="numeric"
                           placeholder="Edit Phone number"
                           onChangeText={(text) => setPhoneNumber(text)}
                />
                <Button title="Submit" onPress={() => handleSubmit("phone_number", phoneNumber)}/>


                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input}
                           placeholder="Edit Password"
                           onChangeText={(text) => setPassword(text)}
                />
                <Button title="Submit" onPress={() => handleSubmit("password", password)}/>

                <Button title="Home" onPress={() => navigation.navigate('HomeScreen')}/>

            </View>
        )
}

const styles = StyleSheet.create(
    {
        container: {
            flexDirection: "row",   // put label + input side by side
            alignItems: "center",   // align vertically
            marginVertical: 6,
        },

        label: {
            marginRight: 8,         // little spacing before input
            fontSize: 16,
            color: "#333"
        },

        input: {
            flex: 1,                // take remaining space but not too wide
            maxWidth: 200,          // cap width so it’s not huge
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 8,
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


