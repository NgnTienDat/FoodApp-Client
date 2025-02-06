import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import MapView, { Circle, Marker } from "react-native-maps"
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Icon } from "react-native-paper"
import * as Location from 'expo-location'
import Colors from "../../config/Colors";
import { MyUserContext } from "../../config/UserContexts";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { GetMyLocations } from "../../components/common/CurrentLocation";
import APIs, { authApis, endpoints } from "../../config/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewLocation = () => {
    const user = useContext(MyUserContext)
    const [deliveryLocation, setDeliveryLocation] = useState(null)
    const nav = useNavigation()
    const [receiver, setReceiver] = useState(user.username)
    const [phone, setPhone] = useState(user.phone_number)
    const isFocused = useIsFocused()



    const getMyLocations = async () => {
        const myLocations = await GetMyLocations()
        if (myLocations) {
            console.log('Location: ', myLocations)
            setDeliveryLocation(myLocations)
        }
    }

    const createNewAddress = async () => {
        try {
            const data = {
                address: deliveryLocation.formattedAddress,
                latitude: deliveryLocation.latitude,
                longitude: deliveryLocation.longitude,
                receiver_name: receiver,
                phone_number: phone,
            }
            const authTokenApi = await authApis()
            const response = await authTokenApi.post(endpoints['new-address'], data)

            if (response.status === 200) {

                console.info('Thêm địa chỉ thành công!');
                const currentAddress = {
                    formattedAddress: deliveryLocation.formattedAddress,
                    latitude: deliveryLocation.latitude,
                    longitude: deliveryLocation.longitude,
                    receiver: receiver,
                    phone: phone
                }


                await AsyncStorage.setItem('deliveryLocation', JSON.stringify(currentAddress))
                setDeliveryLocation(currentAddress)
                nav.goBack()


            } else {
                console.error('Lỗi: ', response.data);
            }
        } catch (error) {
            console.error('error: ', error);
        }
    }

    useEffect(() => {
        if (isFocused) {

            getMyLocations()
        }
    }, [isFocused])

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <TextInput style={styles.input}
                placeholder={receiver}
                value={receiver}
                onChangeText={setReceiver}
            />
            <TextInput style={styles.input}
                placeholder={phone}
                value={phone}
                onChangeText={setPhone}

            />

            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginTop: 10 }}
                onPress={() => nav.navigate('MarkLocationScreen')}
            >
                {deliveryLocation ? (
                    <Text style={[styles.input, { width: '92%', fontSize: 16, paddingVertical: 12 }]}>
                        {deliveryLocation.formattedAddress}
                    </Text>
                ) : (

                    <Text style={[styles.input, { width: '92%', fontSize: 16, paddingVertical: 12 }]}>
                        Chọn địa điểm
                    </Text>
                )}
                <Icon source="chevron-right" size={20} color="#000" />
            </TouchableOpacity>
            <TextInput style={[styles.input, { fontSize: 16 }]}
                placeholder="Tòa nhà, số tầng (Không bắt buộc)"
            />
            <TextInput style={[styles.input, { fontSize: 16 }]}
                placeholder="Cổng (Không bắt buộc)"
            />

            <TouchableOpacity style={styles.addLocation} onPress={createNewAddress}>
                <Text style={{ color: '#fff', fontSize: 18 }}>
                    Lưu
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default NewLocation

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
        top: 3,
        zIndex: 1
    },
    input: {

        marginTop: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        fontSize: 18
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
