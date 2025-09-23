// Must have editable email and username
import React, {useState} from "react";
import {Alert, Button, StyleSheet, Text, TextInput, View} from "react-native";
import axios from "axios";
import {URL} from "../../utils/global";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Body to expect -> field to change, value == input
export default function EditProfile({navigation}){

    const [usernameText, setUsernameText] = useState("");

    const handleChange = (text) => {
        setUpdateData((prev) => ({
            ...prev,
            value: text
        }));
    };

    const handleSubmit = async (field, text) =>{
        try {
            const token = await AsyncStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const body = {
                tochange: field,
                value: text
            };

            const response = await axios.put(URL + "update", body);
            console.log(response);
            Alert.alert("Success", `Successfully edited ${field}!`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
            <View>
                <Text>Username</Text>
                <TextInput style={styles.input}
                   placeholder="Edit Username"
                   onChangeText={(text) => setUsernameText(text)}
                />
                <Button title="Submit" onPress={() => handleSubmit("username", usernameText)} />

                <Text>Email</Text>
                <TextInput style={styles.input}
                           placeholder="Email"
                           onChangeText={handleChange}
                />
                <Button title="Submit" onPress={handleSubmit}/>

                <Text>Phone Number</Text>
                <TextInput style={styles.input}
                           placeholder="Edit Phone number"
                           onChangeText={handleChange}
                />
                <Button title="Submit" onPress={handleSubmit}/>

                <Text>Password</Text>
                <TextInput style={styles.input}
                           placeholder="Edit Password"
                           onChangeText={handleChange}
                />
                <Button title="Submit" onPress={handleSubmit}/>

                <Button title="Home" onPress={() => navigation.navigate('HomeScreen')}/>

            </View>
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


