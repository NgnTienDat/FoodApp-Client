import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = 'http://192.168.1.16:8000/';
// const BASE_URL = 'http://192.168.1.13:8000/';
// const BASE_URL = 'http://192.168.1.8:8000/';
// const BASE_URL = 'http://192.168.1.213:8000/';
// const BASE_URL = 'http://192.168.1.2:8000/';


// const BASE_URL = 'http://192.168.1.12:8000/';
// const BASE_URL = 'http://192.168.1.213:8000/';

// TRUNG LOGIN - Không dùng thì comment lại
// const BASE_URL = 'http://192.168.10.200:8000';


export const endpoints = {
    'restaurants': '/restaurants/',
    'main_categories': '/main_categories/',
    'login': '/o/token/',
    'current-user': '/users/current-user',
    'register': '/users/',
    'foods': '/foods/',
    'search-food': '/search-food/',
    'restaurant-detail': restaurantId => `/restaurants/${restaurantId}/`,
    'restaurant-foods': restaurantId => `/restaurant-foods/${restaurantId}/foods/`,
    'restaurant-menus': restaurantId => `/restaurants/${restaurantId}/client-menus/`,
    'food-detail': foodId => `/foods/${foodId}/`,
    'add-to-cart': '/api/add-to-cart',
    'my-cart': '/carts/my-cart/',
    'delete-cart': cartId => `/cart/${cartId}/`,
    'sub-carts': '/carts/sub-carts/',
    'delete-sub-carts': '/sub-cart/delete-sub-carts/',
    'restaurant-sub-cart': '/sub-cart/restaurant-sub-cart/',
    'update-sub-cart-item': '/update-sub-cart-item/',
    'my-address': '/my-address/my-addresses/',
    'new-address': '/my-address/',
    'order': '/order/',
    'my-address-detail': locationId => `/my-address/${locationId}/`,
    'follow-restaurant': restaurantId => `/follow-restaurant/${restaurantId}/`,
    'followed-restaurant': '/followed-restaurant/',
    'reviews': '/reviews/',
    'momo-payment': '/momo-payment/',
}

export const authApis = async () => {
    const token = await AsyncStorage.getItem('token')
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export default axios.create({
    baseURL: BASE_URL
});