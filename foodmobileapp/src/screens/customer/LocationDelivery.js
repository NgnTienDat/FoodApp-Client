import { useIsFocused, useNavigation } from "@react-navigation/native"
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import CustomerStyles from "../../styles/CustomerStyles"
import { Icon } from "react-native-paper"
import { useContext, useEffect, useState } from "react"
import axios from 'axios';
import { MyUserContext } from "../../config/UserContexts"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Location from 'expo-location'
import { GetSavedLocation } from "../../components/common/CurrentLocation"
import { authApis, endpoints } from "../../config/APIs"
import Colors from "../../config/Colors"


const LocationDelivery = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [deliveryLocation, setDeliveryLocation] = useState(null);
    const [alreadyLocation, setAlreadyLocation] = useState([]);
    const user = useContext(MyUserContext)
    const isFocused = useIsFocused()

    console.log('user: ', user)

    const nav = useNavigation()

    const handleInputChange = async (text) => {
        setQuery(text);

        if (text.length > 2) { // Chỉ thực hiện request khi nhập > 2 ký tự
            try {
                const response = await axios.get(
                    `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json`,
                    {
                        params: {
                            input: text,
                            key: 'AlzaSyVAMUgPYQZuhs-e59WyqvXT3vI6fHbHJ8Q',
                            location: '10.7769,106.7009', // Tọa độ trung tâm TP.HCM
                            radius: 50000,
                        },
                    }
                );

                setSuggestions(response.data.predictions || []);


            } catch (error) {
                console.error('Error fetching autocomplete suggestions:', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectLocation = async (placeId) => {
        try {
            const response = await axios.get(
                `https://maps.gomaps.pro/maps/api/place/details/json`,
                {
                    params: {
                        place_id: placeId,
                        key: 'AlzaSyVAMUgPYQZuhs-e59WyqvXT3vI6fHbHJ8Q',
                    },
                }
            );

            const location = response.data.result.geometry.location
            const location2 = response.data.result.formatted_address

            const newCoord = {
                latitude: location.lat,
                longitude: location.lng,
            }

            setSelectedLocation(newCoord)

            const newDeliveryLocation = await Location.reverseGeocodeAsync({
                latitude: newCoord.latitude,
                longitude: newCoord.longitude,
            })

            console.info('selected location: ', newDeliveryLocation)

            const currentAddress = {
                formattedAddress: location2,
                latitude: newCoord.latitude,
                longitude: newCoord.longitude,
                receiver: user.username,
                phone: user.phone_number
            }

            console.info('saved location: ', currentAddress)


            await AsyncStorage.setItem('deliveryLocation', JSON.stringify(currentAddress))
            setDeliveryLocation(currentAddress)

            setQuery('');
            setSuggestions([]);

        } catch (error) {
            console.error('Error fetching autocomplete suggestions:', error);
        }
    }




    const getAlreadyLocation = async () => {
        try {

            const authTokenApi = await authApis()
            const response = await authTokenApi.get(endpoints['my-address'])

            console.log('already location: ', response.data)
            setAlreadyLocation(response.data)

         
            } catch (error) {
                // console.error('error: ', error);
            }
        }


    const changeLocation = async (locationId, index) => {
            try {

                const selectedLocation = alreadyLocation[index];

                if (selectedLocation) {
                    console.log('Địa chỉ: ', selectedLocation);

                    const currentAddress = {
                        formattedAddress: selectedLocation.address,
                        latitude: deliveryLocation.latitude,
                        longitude: deliveryLocation.longitude,
                        receiver: selectedLocation.receiver_name,
                        phone: selectedLocation.phone_number,
                        id: selectedLocation.id
                    }


                    await AsyncStorage.setItem('deliveryLocation', JSON.stringify(currentAddress))
                    getSavedLocation()

                } else {
                    console.error('Không tìm thấy địa chỉ này.');
                }
            } catch (error) {
                console.error('Lỗi khi đổi địa chỉ: ', error);
            }
        };

        const getSavedLocation = async () => {
            const savedLocation = await GetSavedLocation()
            if (savedLocation) {
                console.log('Locatuion: ', savedLocation)
                setDeliveryLocation(savedLocation)
            }
        }

        const handleTransferTab = () => {
            if (!user) {
                console.log("Chua dang nhap");
                nav.navigate('LoginScreen');
                return;
            } else {
                nav.navigate('NewLocationScreen')
            }

        }

        useEffect(() => {
            if (isFocused) {
                getSavedLocation()
                getAlreadyLocation()
            }
        }, [isFocused])

        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.inputContainer}>
                        <Icon source="magnify" size={20} color="#666" />

                        <TextInput
                            style={styles.input}
                            placeholder="Tìm vị trí"
                            value={query}
                            onChangeText={handleInputChange}
                        />
                    </View>
                    <FlatList
                        data={suggestions}
                        keyExtractor={(item) => item.place_id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.places} onPress={() => handleSelectLocation(item.place_id)}>
                                <Icon source="map-marker-outline" size={20} />
                                <Text style={styles.suggestion}>{item.description}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {deliveryLocation &&


                    <View style={styles.currentLocation}>
                        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                            <Icon source="map-marker-outline" size={25} />
                            <Text style={{ fontSize: 16, marginHorizontal: 10, fontWeight: '400', width: '75%' }}>
                                {deliveryLocation.name}
                            </Text>
                            <Text style={{ fontSize: 17, paddingHorizontal: 6, color: 'blue', height: 30 }}>Sửa</Text>
                        </View>
                        <Text style={{ fontSize: 14, marginHorizontal: 36, fontWeight: '400', width: '75%', color: 'gray' }}>
                            {deliveryLocation.formattedAddress}
                        </Text>
                        <View style={{ flexDirection: 'row', marginLeft: 37, marginTop: 16 }}>
                            <Text style={{ marginRight: 30, color: 'gray' }}>{deliveryLocation.receiver}</Text>
                            <Text style={{ marginRight: 30, color: 'gray' }}>{deliveryLocation.phone}</Text>

                        </View>
                    </View>
                }

                <Text style={{ fontSize: 16, color: 'gray', padding: 10, backgroundColor: '#ccc', }}>Địa chỉ đã lưu</Text>
                {alreadyLocation && user &&
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 200 }}

                        data={alreadyLocation}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={styles.currentLocation} onPress={() => changeLocation(item.id, index)}>
                                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                    <Icon source="map-marker-outline" size={25} />
                                    <Text style={{ fontSize: 16, marginHorizontal: 10, fontWeight: '400', width: '75%' }}>

                                    </Text>
                                    <Text style={{ fontSize: 17, paddingHorizontal: 6, color: 'blue', height: 30 }}>Sửa</Text>
                                </View>
                                <Text style={{ fontSize: 14, marginHorizontal: 36, fontWeight: '400', width: '75%', color: 'gray' }}>
                                    {item.address}
                                </Text>
                                <View style={{ flexDirection: 'row', marginLeft: 37, marginTop: 16 }}>
                                    <Text style={{ marginRight: 30, color: 'gray' }}>{item.receiver_name}</Text>
                                    <Text style={{ marginRight: 30, color: 'gray' }}>{item.phone_number}</Text>

                                </View>
                            </TouchableOpacity>
                        )}
                    />
                }
                <TouchableOpacity style={styles.addLocation} onPress={handleTransferTab}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>
                        Thêm địa chỉ
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    export default LocationDelivery

    const styles = StyleSheet.create({
        addLocation: {
            position: 'absolute',
            padding: 20,
            backgroundColor: Colors.ShoppeOrange,
            // marginTop: 80,
            width: '95%',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
            alignSelf: 'center',
            bottom: 30,
            borderRadius: 10
        },
        container: {
            flex: 1,
            backgroundColor: '#fff',
            position: 'relative',
        },
        currentLocation: {
            height: 130,
            marginTop: 10,

            // backgroundColor: '#ccc',
            // elevation: 2
        },
        input: {
            height: 40,
            borderColor: '#ccc',
            // borderWidth: 1,
            // borderRadius: 8,
            // paddingHorizontal: 12,
            // marginBottom: 1,
            // backgroundColor: '#fff',
            width: '95%'
        },
        inputContainer: {
            paddingHorizontal: 8,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#ccc',
            marginHorizontal: 8,
            marginTop: 4,
        },
        places: {
            backgroundColor: "#fff",
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10
        },
        suggestion: {
            padding: 12,
            borderBottomColor: '#ddd',
            borderBottomWidth: 1,
        },

    })