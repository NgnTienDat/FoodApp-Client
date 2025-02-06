import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import MapView, { Circle, Marker } from "react-native-maps"
import { useEffect, useState } from "react";
import axios from 'axios';
import { Icon } from "react-native-paper"
import * as Location from 'expo-location'
import Colors from "../../config/Colors";
import { GetCurrentLocation, GetSavedLocation } from "../../components/common/CurrentLocation";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MarkLocation = () => {
    const [suggestions, setSuggestions] = useState([]);

    const [location, setLocation] = useState(null)
    const [marker, setMarker] = useState(null)
    const [query, setQuery] = useState('')
    const [deliveryLocation, setDeliveryLocation] = useState(null)
    const isFocused = useIsFocused()
    const nav = useNavigation()


    const getSavedLocation = async () => {
        const savedLocation = await GetSavedLocation()
        if (savedLocation) {
            console.log('mark saved Location: ', savedLocation)
            const coords = {
                latitude: savedLocation.latitude,
                longitude: savedLocation.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            }
            setLocation(coords)
        }
    }

    const initializeLocation = async () => {
        const currentLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Low
        })

        if (currentLocation) {
            console.log("Sử dụng vị trí hiện tại:", currentLocation);
            setLocation({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });

        } else {
            console.log("Không có vị trí nào, sử dụng tọa độ mặc định.");
            setLocation({
                latitude: 10.7769, // TPHCM
                longitude: 106.7009,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            });
        }
    }
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
    }

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

            

            console.info('selected my location: ', location)
            
            const myDeliveryLocation = {
                formattedAddress: location2,
                latitude: newCoord.latitude,
                longitude: newCoord.longitude
            }

            console.info('saved location: ', myDeliveryLocation)
            
            
            await AsyncStorage.setItem('myDeliveryLocation', JSON.stringify(myDeliveryLocation))
            setDeliveryLocation(myDeliveryLocation)

            setQuery('');
            setSuggestions([]);
            nav.goBack()
            


        } catch (error) {
            console.error('Error fetching autocomplete suggestions:', error);
        }
    }

    useEffect(() => {
        if (isFocused) {
            console.log("Màn hình được focus");
            initializeLocation();
        }
    }, [isFocused]);



    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập địa điểm..."
                    value={query}
                    onChangeText={handleInputChange}
                />

                <FlatList
                    data={suggestions}
                    keyExtractor={(item) => item.place_id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.places}
                            onPress={() => handleSelectLocation(item.place_id)}>
                            <Icon source="map-marker-outline" size={20} />
                            <Text style={styles.suggestion}>{item.description}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            {location ? ( // Chỉ render MapView nếu location không phải null
                <MapView
                    key={location.latitude} // location chắc chắn có giá trị ở đây
                    style={styles.map}
                    region={location}
                    showsUserLocation
                    showsMyLocationButton
                >
                    <Marker coordinate={location} />
                </MapView>
            ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>Đang tải vị trí...</Text>
                </View>
            )}

            <TouchableOpacity style={styles.addLocation} >
                <Text style={{ color: '#fff' }}>
                    Thêm địa chỉ
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default MarkLocation

const styles = StyleSheet.create({
    dot: {
        width: 20, // Đường kính hình tròn
        height: 20,
        backgroundColor: 'blue',
        borderRadius: 10, // Để hình tròn
        borderWidth: 2,
        borderColor: 'white', // Viền trắng quanh điểm
    },
    map: {
        flex: 1
    },
    places: {
        backgroundColor: "#fff",
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    inputContainer: {
        padding: 10,
        width: '100%',
        // backgroundColor: 'red',
        position: 'absolute',
        top: 50,
        zIndex: 1
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        // marginBottom: 1,
        backgroundColor: '#fff'
    },
    suggestion: {
        padding: 12,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    addLocation: {
        position: 'absolute', bottom: 30,
        padding: 20,
        backgroundColor: Colors.ShoppeOrange,
        width: '95%',
        justifyContent: 'center',
        alignSelf: 'center',
        marginHorizontal: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
});
