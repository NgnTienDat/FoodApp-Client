import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location'
import { MyUserContext } from '../../config/UserContexts';
import { useContext } from 'react';
import axios from 'axios';

export const GetCurrentLocation = async () => {
    const user = useContext(MyUserContext)

    try {
        let { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== 'granted') {
            Alert.alert(
                'Permission Denied',
                'Please allow location access to use this feature',
                [{ text: 'OK' }]
            );
            return null;
        }

        const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced
        })

        console.log('current lat: ', location.coords.latitude)
        console.log('current lat: ', location.coords.longitude)
        // console.log('current location: ', location)
        const addressDetail = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        })

        // const currentAddress = {
        //     formattedAddress: addressDetail[0].formattedAddress,
        //     latitude: location.coords.latitude,
        //     longitude: location.coords.longitude,
        //     receiver: user.username,
        //     phone: user.phone_number,

        // }

        const currentAddress = {
            formattedAddress: '147 Nguyễn Thái Bình, xã Hòa Thắng, Buôn Ma Thuột, Đăk Lăk',
            latitude: 12.6543443,
            longitude: 108.1080219,
            receiver: user.username,
            phone: user.phone_number,

        }
        console.log('current location: ', currentAddress)

        await AsyncStorage.setItem('deliveryLocation', JSON.stringify(currentAddress))

        return currentAddress

    } catch (error) {
        console.error('error: ', error)
        return null
    }
}

export const GetSavedLocation = async () => {
    try {
        const savedLocation = await AsyncStorage.getItem('deliveryLocation')
        return savedLocation ? JSON.parse(savedLocation) : null
    } catch (error) {
        console.error('Error reading location:', error);
        return null
    }
}

export const GetMyLocations = async () => {
    try {
        const savedLocation = await AsyncStorage.getItem('myDeliveryLocation')
        return savedLocation ? JSON.parse(savedLocation) : null
    } catch (error) {
        console.error('Error reading location:', error);
        return null
    }
}


export const CalculateDistance = async () => {
    try {
        const savedLocation = await AsyncStorage.getItem('myDeliveryLocation')
        return savedLocation ? JSON.parse(savedLocation) : null
    } catch (error) {
        console.error('Error reading location:', error);
        return null
    }
}


export const GeocodingAddress = async(address) => {
    try {
        const response = await axios.get(
            `https://maps.gomaps.pro/maps/api/geocode/json`,
            {
                params: {
                    address: address,
                    key: 'AlzaSyVAMUgPYQZuhs-e59WyqvXT3vI6fHbHJ8Q',
                },
            }
        )

       
        return response.data.results[0].place_id
    } catch (error) {
        console.error('error: ', error)
    }
} 

export const ReturnDistance = async (origin, destination) => {
    try {
        const response = await axios.get(
            `https://maps.gomaps.pro/maps/api/distancematrix/json`,
            {
                params: {
                    destinations: `place_id:${destination}`,
                    origins: `place_id:${origin}`,
                    key: 'AlzaSyVAMUgPYQZuhs-e59WyqvXT3vI6fHbHJ8Q',
                },
            }
        )
        console.log('distance data: ',  response.data.rows[0].elements[0].distance)

        return response.data.rows[0].elements[0].distance
    } catch (error) {
        console.error('error: ', error)
    }
}