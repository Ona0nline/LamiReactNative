// Must have editable email and username
import React from "react";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";

export default function EditProfile({navigation}){

    return (
            <View>
                <Text>Username</Text>
                <TextInput style={styles.input}
                    placeholder="Edit Username"
                    // onChangeText={(text) => handleChange("email", text)}
                />
                {/*make a handle submit functuion to call onto that url eneh*/}
                <Button title="Submit"/>

                <Text>Email</Text>
                <TextInput style={styles.input}
                           placeholder="Email"
                           // onChangeText={(text) => handleChange("email", text)}
                />
                {/*make a handle submit functuion to call onto that url eneh*/}
                <Button title="Submit"/>

                <Text>Phone Number</Text>
                <TextInput style={styles.input}
                           placeholder="Edit Phone number"
                           // onChangeText={(text) => handleChange("email", text)}
                />
                {/*make a handle submit functuion to call onto that url eneh*/}
                <Button title="Submit"/>

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


