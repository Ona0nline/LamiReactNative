import React, {useEffect, useState} from 'react';
import {View, Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {URL} from "../../utils/global";
import axios from "axios";

export default function ProfileScreen() {

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const getProfileDetails = async () => {
            try {
                const storedDetails = await AsyncStorage.getItem("userDetails");
                if (storedDetails) return; // already have it

                const token = await AsyncStorage.getItem('token');
                console.log("Profiles: " + token)
                // const response = await axios.get("http://localhost:9090/profile", {
                //     headers: { Authorization: `Bearer ${token?.trim()}` }
                // });
                const options = {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token?.trim()}` }
                }
                const response = await fetch(URL + "profile", options );
                const data = await response.json();
                console.log(data);
                setProfile(data)

                 // store in state
            } catch (err) {
                console.error(err);
            }
        };

        getProfileDetails();
    }, []);

    return (
        <View style={{ padding: 20 }}>
            <View style={{ backgroundColor: "green", width: 100, height: 100 }} />

            {profile ? (
                <>
                    <Text>Email: {profile.email}</Text>
                    <Text>Username: {profile.username}</Text>
                    <Text>Phone: {profile.phone_number}</Text>
                </>
            ) : (
                <Text>Loading profile...</Text>
            )}
        </View>
    );
}
