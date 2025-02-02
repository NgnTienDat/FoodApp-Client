
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Icon } from 'react-native-paper';
import CustomerStyles from '../../styles/CustomerStyles';
import { Image } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useMainCategories } from '../../api/HookCustomer';
import { useContext, useEffect, useState } from 'react';
import { GetCurrentLocation, GetSavedLocation } from '../common/CurrentLocation';
import { MyUserContext } from '../../config/UserContexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location'


export const HomeHeader = () => {
    const nav = useNavigation()
    const [currentLocation, setCurrentLocation] = useState(null)
    const user = useContext(MyUserContext)
    const isFocused = useIsFocused()



    const getCurrentLocation = async () => {
        // const location = await GetCurrentLocation()
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

            const currentAddress = {
                formattedAddress: addressDetail[0].formattedAddress,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                receiver: user ? user.username:'',
                phone: user ? user.phone_number:'',

            }

            // const currentAddress = {
            //     formattedAddress: '147 Nguyễn Thái Bình, xã Hòa Thắng, Buôn Ma Thuột, Đăk Lăk',
            //     latitude: 12.6543443,
            //     longitude: 108.1080219,
            //     receiver: user.username,
            //     phone: user.phone_number,

            // }
            console.log('current location: ', currentAddress)

            await AsyncStorage.setItem('deliveryLocation', JSON.stringify(currentAddress))
            setCurrentLocation(currentAddress)
            // return currentAddress

        } catch (error) {
            console.error('error: ', error)
            return null
        }


        // console.log('curee: ', location)
        // if (location) {
        //     setCurrentLocation(location)

        // }
    }
    const getSavedLocation = async () => {
        const savedLocation = await GetSavedLocation()
        if (savedLocation) {
            console.log('Location: ', savedLocation)
            setCurrentLocation(savedLocation)
        }
    }
    useEffect(() => {
        getCurrentLocation()

    }, [])

    useEffect(() => {
        getSavedLocation();
    }, [isFocused])
    return (

        <View style={CustomerStyles.container_home_header}>
            <View>
                <TouchableOpacity style={CustomerStyles.addressContainer}
                    onPress={() => nav.navigate('LocationDelivery')}

                >
                    <Text style={CustomerStyles.deliverText}>Giao đến:</Text>
                    <View style={CustomerStyles.addressRow}>
                        <Icon source="map-marker-outline" size={20} color="#fff" />
                        {currentLocation &&
                            <Text style={CustomerStyles.addressText} numberOfLines={1}>
                                {currentLocation.formattedAddress}
                            </Text>
                        }
                        <Icon source="chevron-right" size={20} color="#000" />
                    </View>
                </TouchableOpacity>




            </View>
            <View style={CustomerStyles.homeHeaderContainer}>
                <Icon source="magnify" size={20} color="#666" />
                <TouchableOpacity onPress={() => nav.navigate('SearchEngine')}>

                    <Text style={{ fontSize: 14, color: '#999' }}>
                        Balzar De Cafe, Bánh Mì Chim Chay Giảm 50%
                    </Text>

                </TouchableOpacity>

            </View>
        </View>

    );
};


export const MainCategory = () => {

    const mainCategories = useMainCategories()

    return (
        <View style={{ flex: 1, height: 155 }}>
            <ScrollView horizontal={true} style={CustomerStyles.scrollMainCategories}
                showsHorizontalScrollIndicator={false}>
                {mainCategories.map((main_c) => (
                    <TouchableOpacity key={main_c.id}  //
                        style={CustomerStyles.itemMainCategories}>

                        <View style={CustomerStyles.mainCategoryImg}>
                            <Image source={{ uri: main_c.image }} style={{ width: 40, height: 40 }} />
                        </View>
                        <Text style={{ marginTop: 5, fontSize: 15 }}>{main_c.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Text style={CustomerStyles.nearRestaurant}>
                Quán ngon gần bạn
            </Text>
        </View>
    )
}

