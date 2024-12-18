import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Switch, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import RestaurantStyles from "../../styles/RestaurantStyles";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-paper';
import RestaurantAPIs, { endpoints } from "../../config/RestaurantAPIs";

const DashBoard = ({ navigation }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [restaurant, setRestaurant] = useState([]);
    const restaurantId = 1
    const [page, setPage] = useState(1);
    const [foods, setFoods] = useState([]);

    const loadRestaurant = async () => {
        try {
            setLoading(true);
            let res = await RestaurantAPIs.get(endpoints['restaurant'](restaurantId))
            setRestaurant(res.data)
        }
        catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    const loadFoods = async () => {
        try {
            if (page > 0) {
                let url = `${endpoints['restaurantFoods'](restaurantId)}?page=${page}` //lấy api và số trang
                setLoading(true)
                let res = await RestaurantAPIs.get(url)
                if (page > 1)
                    setFoods(current_res => [...current_res, ...res.data])
                else
                    setFoods(res.data)

                if (!res.data.next) {
                    setPage(0);
                }
            }

        } catch (ex) {
            console.error('aaaaa' + ex);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadRestaurant();
    }, [restaurantId]);

    useEffect(() => {
        loadFoods();
    }, [restaurantId, page]);

    const loadMore = () => {
        if (page > 0 && !loading)
            setPage(page + 1);
    }
    const refresh = () => {
        setPage(1);
        setFoods([]);
        loadFoods();
    }


    return (
        <SafeAreaView style={RestaurantStyles.container}>

            {/* header */}
            <View style={RestaurantStyles.header}>
                <Image source={{ uri: restaurant.image || '' }} style={RestaurantStyles.storeImage} />
                <View style={RestaurantStyles.storeInfo}>
                    <Text style={RestaurantStyles.storeName}>{restaurant.name || 'Tên nhà hàng'}</Text>
                    <Text style={RestaurantStyles.storeDetails}>{restaurant.phone_number || 'Số điện thoại'}</Text>
                    <Text style={RestaurantStyles.storeDetails}>{restaurant.address || 'Địa chỉ'}</Text>
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
            <View>
                {loading && <ActivityIndicator />}
            </View>
            {/* mon an */}
            <Text style={RestaurantStyles.sectionTitle}>Món của bạn</Text>
            <FlatList
                refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
                onEndReached={loadMore}
                data={foods}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[RestaurantStyles.dishCard]} key={`${item.id}-${Math.random()}`}>
                        <Image source={{ uri: item.image }} style={RestaurantStyles.dishImage} />
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 10 }}>
                            <Text style={RestaurantStyles.dishName}>{item.name}</Text>
                            <Text>Thành tiền: {item.price} VNĐ</Text>
                            <Text>{item.description}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                refreshing={loading}
                onRefresh={loadFoods}
            />
        </SafeAreaView>
    );
};

export default DashBoard;
