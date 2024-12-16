import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'react-native-paper';
import DashBoard from '../screens/restaurant/DashBoard'
import RestaurantProfile from '../components/restaurant/RestaurantProfile';
import RestaurantIncome from '../components/restaurant/RestaurantIncome';
import RestaurantMenu from '../components/restaurant/RestaurantMenu';
import RestaurantOrder from '../components/restaurant/RestaurantOrder';
import RestaurantReport from '../components/restaurant/RestaurantReport';
import RestaurantActiveTime from '../components/restaurant/RestaurantActiveTime';
import RestaurantSaleSchedule from '../components/restaurant/RestaurantSaleSchedule';
import RestaurantFood from '../components/restaurant/RestaurantFood';
import RestaurantCategoryFood from '../components/restaurant/RestaurantCategoryFood';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MenuStackNavigator = () => {
    return (

        <Stack.Navigator >
            <Stack.Screen name="index" component={RestaurantMenu} options={{ title: 'Thực đơn' }} />
            <Stack.Screen name="menu" component={RestaurantFood} options={{ title: 'Món ăn' }} />
            <Stack.Screen name="sale_schedule" component={RestaurantSaleSchedule} options={{ title: 'Lịch bán' }} />
            <Stack.Screen name="category_food" component={RestaurantCategoryFood} options={{ title: 'Danh mục món ăn' }} />
        </Stack.Navigator>
    );
}



const StackNavigator = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="home" component={DashBoard} options={{ headerShown: false }} />
            <Stack.Screen name="index_menu" component={MenuStackNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="order" component={RestaurantOrder} options={{ title: 'Đơn hàng' }} />
            <Stack.Screen name="report" component={RestaurantReport} options={{ title: 'Báo cáo' }} />
            <Stack.Screen name="active_time" component={RestaurantActiveTime} options={{ title: 'Giờ hoạt động' }} />
        </Stack.Navigator>
    );
}
const RestaurantNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="index" component={StackNavigator} options={{ headerShown: false, title: 'Trang chủ', tabBarIcon: () => <Icon source="store-outline" size={30} /> }} />
            <Tab.Screen name="profile" component={RestaurantIncome} options={{ title: 'Thu nhập', tabBarIcon: () => <Icon source="wallet-outline" size={30} /> }} />
            <Tab.Screen name="income" component={RestaurantProfile} options={{ headerShown: false, title: 'Tôi', tabBarIcon: () => <Icon source="account-outline" size={30} /> }} />
        </Tab.Navigator>
    );
};

export default RestaurantNavigation;