import * as React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import ProfileScreen from "./ProfileScreen";
import {View, Text, Button} from "react-native";

export default function HomeScreen({navigation}) {

    return (
        <View>
            <Text>Welcome Home</Text>
            <Button title={"Click me"} onPress={() => navigation.navigate('Profile')} />
        </View>

    );
}
