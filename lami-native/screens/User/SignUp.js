import React, {useState} from 'react';
import {Button, View, StyleSheet, Text} from "react-native";
import {TextInput} from "react-native-gesture-handler";
import axios from "axios";

export default function Signup () {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone_number: "",
        password: "",
        confirmpassword: "",
        latitude: "",
        longitude: "",
        placename: ""
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
            const res = await axios.post("https://your-api.com/signup", formData);
            console.log("Signup success:", res.data);
        } catch (err) {
            console.error("Signup error:", err);
        }
    };

    return(

            <View style={styles.container}>
            {/*    instead of label it's text andinstead of input it's textinput*/}
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
                    value={formData.confirmpassword}
                    onChangeText={(text) => handleChange("confirmpassword", text)}
                />

                <Text>Latitude</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Latitude"
                    keyboardType="numeric"
                    value={formData.latitude}
                    onChangeText={(text) => handleChange("latitude", text)}
                />

                <Text>Longitude</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Longitude"
                    keyboardType="numeric"
                    value={formData.longitude}
                    onChangeText={(text) => handleChange("longitude", text)}
                />

                <Text>Place Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Place name"
                    value={formData.placename}
                    onChangeText={(text) => handleChange("placename", text)}
                />

                <Button title="Sign up" onPress={handleSubmit} />

            </View>

    )


}

// objects of all your styles
const styles = StyleSheet.create(
    {
        container:{
            padding:16
        },

        input:{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 8,
            marginVertical: 6,
            borderRadius: 4
        }
    }
)