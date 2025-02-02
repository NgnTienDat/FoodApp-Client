import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/customer/HomeScreen';
import AccountScreen from '../screens/customer/AccountScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, IconButton } from 'react-native-paper';
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
import RestaurantScreen from '../screens/customer/RestaurantScreen';
import RestaurantScreen1 from '../screens/customer/RestaurantScreen1';
import Page from '../screens/customer/AdminHeader1';
import Example from '../screens/customer/Test';
import StickySearchBar from '../screens/customer/Test';
import FoodDetail from '../screens/customer/ProductDetail';
import CartScreen from '../screens/customer/CartScreen';
import { Pressable, Text, Touchable } from 'react-native';
import PlaceOrderScreen from '../screens/customer/PlaceOrderScreen';
import LocationDelivery from '../screens/customer/LocationDelivery';
import NewLocation from '../screens/customer/NewLocation';
import MapDirections from '../screens/customer/MapDirection';
import { useNavigation } from '@react-navigation/native';
import MarkLocation from '../screens/customer/MarkLocation';
import AfterOrder from '../screens/customer/AfterOrder';
import FollowedRestaurant from '../screens/customer/FollowedRestaurant';
import Evaluation from '../screens/customer/Evaluation';
import MomoPaymentWebView from '../screens/customer/MomoPaymentWebView';
import Reviews from '../screens/customer/Reviews';

export const Stack = createNativeStackNavigator()

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
            <Stack.Screen name='FollowScreen' component={FollowedRestaurant}
                options={{ title: 'Yêu thích', headerShown: true }} />

        </Stack.Navigator>
    )
}

const OrderStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
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

    const nav = useNavigation()

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
            <Stack.Screen name='RestaurantScreen' component={RestaurantScreen1}
                options={{
                    title: '',
                    headerShown: false,

                }} />

            <Stack.Screen name='FoodDetail' component={FoodDetail} options={{ title: 'Món ăn', headerShown: false }} />
            <Stack.Screen name='CartScreen' component={CartScreen}
                options={{
                    title: 'Giỏ hàng', headerShown: true,
                    headerRight: () => (
                        <Text style={{ fontSize: 17, fontWeight: '400', paddingHorizontal: 5, color: '#0088ff' }}>Sửa</Text>
                    )
                }} />
            <Stack.Screen name='PlaceOrderScreen' component={PlaceOrderScreen} options={{ title: 'Đặt món', headerShown: true }} />
            <Stack.Screen name='LocationDelivery' component={LocationDelivery}
                options={{
                    title: 'Địa chỉ giao hàng', headerShown: true,
                    headerRight: () => (
                        <Pressable onPress={() => nav.navigate('NewLocationScreen')}>
                            <Icon source="map-check-outline" size={25} />
                        </Pressable>
                    )
                }}
            />
            <Stack.Screen name='NewLocationScreen' component={NewLocation} options={{ title: 'Thêm địa chỉ mới', headerShown: true }} />
            <Stack.Screen name='MarkLocationScreen' component={MarkLocation} options={{ title: 'Chọn vị trí', headerShown: true }} />
            <Stack.Screen name='AfterOrderScreen' component={AfterOrder} options={{ title: 's', headerShown: false }} />
            <Stack.Screen name='EvaluationScreen' component={Evaluation} options={{ title: 'Đánh giá món ăn', headerShown: true }} />
            <Stack.Screen name='MomoPaymentWebView' component={MomoPaymentWebView} options={{ title: 'Thanh toán Momo', headerShown: true }} />
            <Stack.Screen name='ReviewsScreen' component={Reviews} options={{ title: 'Các đánh giá', headerShown: true }} />

        </Stack.Navigator>
    )
}

export default RootNavigator

