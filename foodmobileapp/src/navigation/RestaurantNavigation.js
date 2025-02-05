import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Icon } from 'react-native-paper';
import DashBoard from '../screens/restaurant/DashBoard'
import RestaurantProfile from '../components/restaurant/RestaurantProfile';
import RestaurantMenu from '../components/restaurant/RestaurantMenu';
import RestaurantOrder from '../components/restaurant/oder/RestaurantOrder';
import RestaurantReport from '../components/restaurant/report/RestaurantReport';

import RestaurantMenuFood from '../components/restaurant/menu/RestaurantMenuFood';
import RestaurantFood from '../components/restaurant/menu/RestaurantFood';
import RestaurantCategoryFood from '../components/restaurant/menu/RestaurantCategoryFood';
import AddCategory from '../components/restaurant/menu/AddCategory';
import AddFood from '../components/restaurant/menu/AddFood';
import DetailCategory from '../components/restaurant/menu/DetailCategory';
import DetailFood from '../components/restaurant/menu/DetailFood';
import DetailMenu from '../components/restaurant/menu/DetailMenu';
import AddMenu from '../components/restaurant/menu/AddMenu';
import OrderCompleted from '../components/restaurant/oder/OrderCompleted';
import OrderConfirmed from '../components/restaurant/oder/OrderConfirmed';
import OrderDetail from '../components/restaurant/oder/OrderDetail';
import ChatRoom from '../components/restaurant/oder/ChatRoom';
import AddOrderCheck from '../components/restaurant/oder/AddOrderCheck';
import SetShippingFee from '../components/restaurant/SetShippingFee';
import FoodReview from '../components/restaurant/FoodReview';
import RestaurantLocation from '../components/restaurant/RestaurantLocation';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();


const OrderStackNavigator = ({ navigation }) => {
    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: { display: 'none' }
        });
        return () => navigation.getParent()?.setOptions({
            tabBarStyle: { display: 'flex' }
        });
    }, [navigation]);

    //     const timer = setTimeout(() => {
    //         setHasNewOrder(true); // Khi có đơn mới thì set trạng thái thành true
    //     }, 5000);

    //     return () => clearTimeout(timer);
    // }, []);
    return (
        <TopTab.Navigator screenOptions={{
            tabBarLabelStyle: {
                fontSize: 16,
            },
        }}>
            <TopTab.Screen name="order" component={RestaurantOrder} options={{ headerShown: false, tabBarLabel: 'Đơn mới', }} />
            <TopTab.Screen name="order_confirmed" component={OrderConfirmed} options={{ headerShown: false, title: 'Đơn đang làm', }} />
            <TopTab.Screen name="order_completed" component={OrderCompleted} options={{
                headerShown: false, title: 'Đơn đã đóng',
            }} />
        </TopTab.Navigator>
    );
}


const MenuStackNavigator = ({ navigation }) => {
    React.useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: { display: 'none' }
        });
        return () => navigation.getParent()?.setOptions({
            tabBarStyle: { display: 'flex' }
        });
    }, [navigation]);

    return (
        <Stack.Navigator>
            <Stack.Screen name="index" component={RestaurantMenu} options={{ title: 'Thực đơn' }} />
            <Stack.Screen name="menu" component={RestaurantFood} options={{ title: 'Món ăn' }} />
            <Stack.Screen name="sale_schedule" component={RestaurantMenuFood} options={{ title: 'Menu' }} />
            <Stack.Screen name="category_food" component={RestaurantCategoryFood} options={{ title: 'Danh mục món ăn' }} />
            <Stack.Screen name="add_category" component={AddCategory} options={{ title: 'Thêm danh mục' }} />
            <Stack.Screen name="add_food" component={AddFood} options={{ title: 'Thêm món ăn' }} />
            <Stack.Screen name="detail_category" component={DetailCategory} options={{ title: 'Chi tiết danh mục' }} />
            <Stack.Screen name="detail_food" component={DetailFood} options={{ title: 'Chi tiết món ăn' }} />
            <Stack.Screen name="detail_menu" component={DetailMenu} options={{ title: 'Chi tiết menu' }} />
            <Stack.Screen name="add_menu" component={AddMenu} options={{ title: 'Thêm menu' }} />
        </Stack.Navigator>
    );
}

const ReportStackNavigator = ({ navigation, route }) => {
    React.useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: { display: 'none' }
        });
        return () => navigation.getParent()?.setOptions({
            tabBarStyle: { display: 'flex' }
        });
    }, [navigation]);
    return (
        <Stack.Navigator >
            <Stack.Screen name="detail-report" component={RestaurantReport}
                options={{
                    title: 'Báo cáo doanh thu',
                }}
            />
        </Stack.Navigator>
    );
}



const StackNavigator = () => {
    return (
        <>
            <Stack.Navigator >
                <Stack.Screen name="home" component={DashBoard} options={{ headerShown: false }} />
                <Stack.Screen name="index_menu" component={MenuStackNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="index_order" component={OrderStackNavigator} options={{ title: 'Đơn hàng' }} />
                <Stack.Screen name="report" component={ReportStackNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="order_detail" component={OrderDetail} options={{ title: 'Chi tiết đơn hàng' }} />
                <Stack.Screen name="chat_room" component={ChatRoom} options={{ headerShown: false, title: 'Tin nhắn' }} />
                <Stack.Screen name="food_review" component={FoodReview} options={{ title: 'Chi tiết đánh giá' }} />
            </Stack.Navigator>
        </>
    );
}


const ProfileStackNavigator = () => {
    return (
        <>
            <Stack.Navigator >
                <Stack.Screen name="profile" component={RestaurantProfile} options={{ headerShown: false, title: 'Tôi', tabBarIcon: () => <Icon source="account-outline" size={30} /> }} />
                <Stack.Screen name="set_ship" component={SetShippingFee} options={{ title: 'Tùy chỉnh giá vận chuyển' }} />
                <Stack.Screen name="restaurant_location" component={RestaurantLocation} options={{ title: 'Vị trí cửa hàng' }} />
            </Stack.Navigator>
        </>
    );
}



const RestaurantNavigation = () => {
    return (
        <Tab.Navigator  >
            <Tab.Screen name="index" component={StackNavigator} options={{ headerShown: false, title: 'Trang chủ', tabBarIcon: () => <Icon source="home-outline" size={30} /> }} />
            {/* <Tab.Screen name="profile" component={AddOrderCheck} options={{ title: 'check-add-order', tabBarIcon: () => <Icon source="wallet-outline" size={30} /> }} /> */}
            <Tab.Screen name="profile_detail" component={ProfileStackNavigator} options={{ headerShown: false, title: 'Tôi', tabBarIcon: () => <Icon source="account-outline" size={30} /> }} />
        </Tab.Navigator>
    );
};

export default RestaurantNavigation;