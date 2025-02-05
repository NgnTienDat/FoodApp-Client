import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import Styles from "../../styles/RestaurantStyles";
import CustomerStyles from "../../styles/CustomerStyles";
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import RestaurantAPIs, { endpoints } from "../../config/RestaurantAPIs";
import { useContext } from "react";
import { MyDispatchContext, MyUserContext } from "../../config/UserContexts";


const RestaurantProfile = ({ navigation }) => {
    const user = useContext(MyUserContext)
    const restaurantId = user.restaurant_id
    const [restaurant, setRestaurant] = useState([]);

    const loadRestaurant = async () => {
        try {
            console.info(user.id)
            let res = await RestaurantAPIs.get(endpoints['restaurant'](restaurantId))
            setRestaurant(res.data)
            console.log('res data: ', res.data)
        }
        catch (ex) {
            console.error(ex);
        } finally {

        }
    }
    useEffect(() => {
        loadRestaurant();
    }, [restaurantId]);

    return (
        <SafeAreaView style={Styles.container}>
            <View style={Styles.headerProfile}>
                <Image
                    source={{ uri: restaurant.image || '' }}
                    style={Styles.avatar}
                />
                <Text style={Styles.storeName}>{restaurant.name || 'Tên nhà hàng'}</Text>
                <Text style={Styles.phone}>Đánh giá:  {restaurant.star_rate || 'Đánh giá'} ⭐</Text>
                <Text style={Styles.phone}>Điện thoại: {restaurant.phone_number || 'Số điện thoại'}</Text>
                <Text style={Styles.phone}>Địa chỉ: {restaurant.address || 'Địa chỉ'}</Text>
            </View>

            <View>
                <TouchableOpacity style={CustomerStyles.menuItem}>
                    <Text style={CustomerStyles.menuText}>
                        <Text style={{ fontSize: 18 }}>⚙️</Text> Cài đặt
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={CustomerStyles.menuItem}
                    onPress={() => navigation.navigate('set_ship')}>
                    <Text style={CustomerStyles.menuText}>
                        <Text style={{ fontSize: 18 }}>📄</Text> Tùy chỉnh phí vận chuyển
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={CustomerStyles.logoutButton}>
                    <Text style={CustomerStyles.logoutText}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
export default RestaurantProfile;