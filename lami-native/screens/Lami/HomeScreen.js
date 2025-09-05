import * as React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import ProfileScreen from "./ProfileScreen";
import {View, Text, Button} from "react-native";

// The page that will have your curr location as UI, and have the sliding about thing (Lami -> LamiLux -> LamiTaxi)
// Also have the button to take you to the profile page
export default function HomeScreen({navigation}) {

    return (
        <View>
            <Text>Welcome Home</Text>
            <Button title={"Click me"} onPress={() => navigation.navigate('Profile')} />
        </View>

    );
}
