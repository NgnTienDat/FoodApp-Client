import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/customer/HomeScreen';
import AccountScreen from '../screens/customer/AccountScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-paper';
import DashBoard from '../screens/restaurant/DashBoard';
import CustomerStyles from '../styles/CustomerStyles';
import React from 'react';
import RestaurantNavigation from './RestaurantNavigation';
import HomeScreenTest from '../screens/customer/test';
import SearchScreen from '../screens/customer/SearchScreen';
import FollowScreen from '../screens/customer/FollowScreen';
import OrderScreen from '../screens/customer/OrderScreen';


const Stack = createNativeStackNavigator()

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='SearchEngine' t component={SearchScreen} options={{ title: 'Tìm kiếm', headerShown: true}}/>

        </Stack.Navigator>
    )
}

const AccountStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='AccountScreen' component={AccountScreen} />
            
        </Stack.Navigator>
    )
}


const FollowStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='FollowScreen' component={FollowScreen} />
            
        </Stack.Navigator>
    )
}

const OrderStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='OrderScreen' component={OrderScreen} />
            
        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: CustomerStyles.tabBar,
            tabBarIconStyle: CustomerStyles.tabBarIcon,
            tabBarLabelStyle: CustomerStyles.tabBarLabel,
            headerShown: false
        }}>
            <Tab.Screen name='homeScreen' component={HomeStackNavigator}
                options={{ title: 'Trang chủ', 
                tabBarIcon: () => <Icon source="home-outline" size={30} /> }} />
            <Tab.Screen name='following' component={FollowStackNavigator}
                options={{ title: 'Yêu thích', 
                tabBarIcon: () => <Icon source="heart-outline" size={30} /> }} />
            <Tab.Screen name='orders' component={OrderStackNavigator}
                options={{ title: 'Đơn hàng', 
                tabBarIcon: () => <Icon source="format-list-checkbox" size={30} /> }} />
            <Tab.Screen name='me' component={AccountStackNavigator}
                options={{ title: 'Tôi', 
                tabBarIcon: () => <Icon source="account-outline" size={30} /> }} />
        </Tab.Navigator>
    )
}

const RootNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen  name='MyRestaurant' component={RestaurantNavigation} options={{ headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default RootNavigator