import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/customer/HomeScreen';
import AccountScreen from '../screens/customer/AccountScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-paper';
import DashBoard from '../screens/restaurant/DashBoard';
import CustomerStyles from '../styles/CustomerStyles';
import React, { useContext } from 'react';
import RestaurantNavigation from './RestaurantNavigation';
import SearchScreen from '../screens/customer/SearchScreen';
import FollowScreen from '../screens/customer/FollowScreen';
import OrderScreen from '../screens/customer/OrderScreen';
import LoginScreen from '../screens/auth/Login';
import RegisterScreen from '../screens/auth/Register';
import RestaurantRegisterScreen from '../screens/auth/RestaurantRegister';
import { MyUserContext } from '../config/UserContexts';
import MySearchBar from '../components/customer/SearchingBar';
import SearchedScreen, { FoodRoute, RestaurantRoute } from '../screens/customer/Searched';
import FoodFilter from '../components/customer/FoodFilter';
import { CardStyleInterpolators } from '@react-navigation/stack';


const Stack = createNativeStackNavigator()

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />

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
            <Stack.Screen name='FollowScreen' component={FollowScreen}
                options={{ title: 'Yêu thích', headerShown: true }} />

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
                options={{
                    title: 'Trang chủ',
                    tabBarIcon: () => <Icon source="home-outline" size={30} />
                }} />
            <Tab.Screen name='following' component={FollowStackNavigator}
                options={{
                    title: 'Yêu thích',
                    tabBarIcon: () => <Icon source="heart-outline" size={30}
                    />
                }} />
            <Tab.Screen name='orders' component={OrderStackNavigator}
                options={{
                    title: 'Đơn hàng',
                    tabBarIcon: () => <Icon source="format-list-checkbox" size={30} />
                }} />
            <Tab.Screen name='me' component={AccountStackNavigator}
                options={{
                    title: 'Tôi',
                    tabBarIcon: () => <Icon source="account-outline" size={30} />
                }} />
        </Tab.Navigator>
    )
}

const RootNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name='MyRestaurant' component={RestaurantNavigation} options={{ headerShown: false }} />
            <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ title: 'Đăng nhập', headerShown: true }} />
            <Stack.Screen name='SearchEngine' t component={SearchScreen}
                options={{
                    title: 'Tìm kiếm', headerShown: true,
                    header: () => (
                        <MySearchBar />
                    )
                }} />
            <Stack.Screen name='SearchedScreen' component={SearchedScreen}
                options={{
                    title: 'eh', headerShown: true, header: () => (
                        <MySearchBar />
                    )
                }} />
            <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{ title: 'Đăng ký', headerShown: true }} />
            <Stack.Screen name='RestaurantRegisterScreen' component={RestaurantRegisterScreen} options={{ title: 'Đăng ký nhà hàng', headerShown: true }} />
            
        </Stack.Navigator>
    )
}

export default RootNavigator

