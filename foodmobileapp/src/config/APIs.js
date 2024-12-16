import axios from "axios";

const BASE_URL = 'http://192.168.1.213:8000/';

export const endpoints = {
    'restaurants': '/restaurants/',
    'main_categories': '/main_categories/'
}

export default axios.create({
    baseURL: BASE_URL
});