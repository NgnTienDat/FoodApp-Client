import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import Styles from "../../styles/RestaurantStyles";
import CustomerStyles from "../../styles/CustomerStyles";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import RestaurantAPIs, { endpoints } from "../../config/RestaurantAPIs";

const RestaurantProfile = () => {
    const [restaurant, setRestaurant] = useState([]);
    const restaurantId = 1

    const loadRestaurant = async () => {
        try {
            let res = await RestaurantAPIs.get(endpoints['restaurant'](restaurantId))
            setRestaurant(res.data)
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
                <Text style={Styles.rating}>⭐: {restaurant.star_rate || 'Đánh giá'}</Text>
                <Text style={Styles.phone}>📞: {restaurant.phone_number || 'Số điện thoại'}</Text>
                <Text style={Styles.infoText}>📍: {restaurant.address || 'Địa chỉ'}</Text>
            </View>

            <View>
                <TouchableOpacity style={CustomerStyles.menuItem}>
                    <Text style={CustomerStyles.menuText}>
                        <Text style={{ fontSize: 18 }}>⚙️</Text> Cài đặt
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={CustomerStyles.menuItem}>
                    <Text style={CustomerStyles.menuText}>
                        <Text style={{ fontSize: 18 }}>👤</Text> Thay đổi thông tin cá nhân
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={CustomerStyles.menuItem}>
                    <Text style={CustomerStyles.menuText}>
                        <Text style={{ fontSize: 18 }}>🔒</Text> Đổi mật khẩu
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={CustomerStyles.menuItem}>
                    <Text style={CustomerStyles.menuText}>
                        <Text style={{ fontSize: 18 }}>📄</Text> Điều khoản và điều kiện
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