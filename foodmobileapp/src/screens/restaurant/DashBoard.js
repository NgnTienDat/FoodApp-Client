import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import RestaurantStyles from "../../styles/RestaurantStyles";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-paper';

const DashBoard = ({ navigation }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <SafeAreaView style={RestaurantStyles.container}>
            <ScrollView >
                {/* header */}
                <View style={RestaurantStyles.header}>
                    <Image source={{ uri: '' }} style={RestaurantStyles.storeImage} />
                    <View style={RestaurantStyles.storeInfo}>
                        <Text style={RestaurantStyles.storeName}>Name Food Store</Text>
                        <Text style={RestaurantStyles.storeDetails}>0982878654</Text>
                        <Text style={RestaurantStyles.storeDetails}>123 Đường Nguyễn Văn Linh, Quận 7, TP.HCM</Text>
                    </View>
                </View>

                {/* close-open store */}
                <View style={RestaurantStyles.switchContainer}>
                    <Text style={RestaurantStyles.switchLabel}>Mở cửa</Text>
                    <Switch value={isOpen} onValueChange={setIsOpen} />
                </View>

                {/* control */}
                <View style={RestaurantStyles.menuOptions}>
                    <TouchableOpacity style={RestaurantStyles.menuItem}
                        onPress={() => navigation.navigate('index_menu')}>
                        <Icon source="silverware" size={30} />
                        <Text style={RestaurantStyles.iconText}>Thực đơn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={RestaurantStyles.menuItem}
                        onPress={() => navigation.navigate('active_time')}>
                        <Icon source="clock-time-eight-outline" size={30} />
                        <Text style={RestaurantStyles.iconText}>Giờ hoạt động</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={RestaurantStyles.menuItem}
                        onPress={() => navigation.navigate('report')}>
                        <Icon source="poll" size={30} />
                        <Text style={RestaurantStyles.iconText}>Báo cáo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={RestaurantStyles.menuItem}
                        onPress={() => navigation.navigate('order')}>
                        <Icon source="food-outline" size={30} />
                        <Text style={RestaurantStyles.iconText}>Đơn hàng</Text>
                    </TouchableOpacity>
                </View>

                {/* mon an */}
                <Text style={RestaurantStyles.sectionTitle}>Món của bạn</Text>
                <ScrollView style={RestaurantStyles.dishList}>
                    <TouchableOpacity style={RestaurantStyles.dishCard}>
                        <Image source={{ uri: '' }} style={RestaurantStyles.dishImage} />
                        <Text style={RestaurantStyles.dishName}>Món ăn 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={RestaurantStyles.dishCard}>
                        <Image source={{ uri: '' }} style={RestaurantStyles.dishImage} />
                        <Text style={RestaurantStyles.dishName}>Món ăn 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={RestaurantStyles.dishCard}>
                        <Image source={{ uri: '' }} style={RestaurantStyles.dishImage} />
                        <Text style={RestaurantStyles.dishName}>Món ăn 3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={RestaurantStyles.dishCard}>
                        <Image source={{ uri: '' }} style={RestaurantStyles.dishImage} />
                        <Text style={RestaurantStyles.dishName}>Món ăn 4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={RestaurantStyles.dishCard}>
                        <Image source={{ uri: '' }} style={RestaurantStyles.dishImage} />
                        <Text style={RestaurantStyles.dishName}>Món ăn 4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={RestaurantStyles.dishCard}>
                        <Image source={{ uri: '' }} style={RestaurantStyles.dishImage} />
                        <Text style={RestaurantStyles.dishName}>Món ăn 4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={RestaurantStyles.dishCard}>
                        <Image source={{ uri: '' }} style={RestaurantStyles.dishImage} />
                        <Text style={RestaurantStyles.dishName}>Món ăn 4</Text>
                    </TouchableOpacity>
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DashBoard;

