import axios from "axios";

export const BASE_URL = 'http://192.168.10.200:8000';

export const endpoints = {
    foods: '/foods/',
    categories: '/food_categories/',
};

const RestaurantAPIs = axios.create({
    baseURL: BASE_URL,
});

export default RestaurantAPIs;
