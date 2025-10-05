import * as React from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function HomeScreen({ navigation }) {
    const [location, setLocation] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [region, setRegion] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check login status
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const token = await AsyncStorage.getItem('loggedInState');
                setIsLoggedIn(token === 'true');
            } catch (error) {
                console.error('Error checking login state:', error);
            } finally {
                setIsLoading(false);
            }
        };
        checkLogin();
    }, []);

    // Get foreground location
    useEffect(() => {
        const getLocation = async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                let locationConfig = { accuracy: Location.Accuracy.High };

                if (status !== 'granted') {
                    Alert.alert(
                        'Location Permission Denied',
                        'Please enable location permissions in Settings to view the map.',
                        [{ text: 'OK' }]
                    );
                    locationConfig.accuracy = Location.Accuracy.Low;
                }

                const currentLocation = await Location.getCurrentPositionAsync({
                    accuracy: locationConfig.accuracy,
                });
                setLocation(currentLocation);
                await AsyncStorage.setItem('userLocation', JSON.stringify(currentLocation));
                setRegion({
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
                console.log('Location fetched:', currentLocation);
            } catch (error) {
                console.error('Error fetching location:', error.message, error.stack);
                Alert.alert(
                    'Location Error',
                    `Failed to access location: ${error.message}. Please ensure location permissions are enabled.`,
                    [{ text: 'OK' }]
                );
            }
        };

        getLocation();
    }, []);

    // Update location periodically
    useEffect(() => {
        const updateLocation = async () => {
            try {
                const stored = await AsyncStorage.getItem('userLocation');
                if (stored) {
                    const parsedLocation = JSON.parse(stored);
                    setLocation(parsedLocation);
                    setRegion({
                        latitude: parsedLocation.coords.latitude,
                        longitude: parsedLocation.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    });
                }
            } catch (error) {
                console.error('Error fetching stored location:', error);
            }
        };

        updateLocation();
        const interval = setInterval(updateLocation, 5000);
        return () => clearInterval(interval);
    }, []);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {isLoggedIn ? (
                <>
                    <Text style={styles.h1}>Welcome back!</Text>
                    <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
                </>
            ) : (
                <>
                    <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
                    <Button title="Login" onPress={() => navigation.navigate('Login')} />
                </>
            )}

            {region ? (
                <MapView
                    style={styles.map}
                    region={region}
                    showsUserLocation={true}
                >
                    <Marker
                        coordinate={{
                            latitude: region.latitude,
                            longitude: region.longitude,
                        }}
                        title="You are here"
                    />
                </MapView>
            ) : (
                <View style={styles.map}>
                    <Text>Waiting for location...</Text>
                </View>
            )}
        </View>
    );
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