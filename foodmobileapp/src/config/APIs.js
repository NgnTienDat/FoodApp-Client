import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// const BASE_URL = 'http://192.168.1.12:8000/';
const BASE_URL = 'http://192.168.1.213:8000/';


export const endpoints = {
    'restaurants': '/restaurants/',
    'main_categories': '/main_categories/',
    'login': '/o/token/',
    'current-user': '/users/current-user',
    'register': '/users/',
    'foods': '/foods/',
    'search-food': '/search-food/'
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