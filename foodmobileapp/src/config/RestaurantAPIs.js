import axios from "axios";

export const BASE_URL = 'http://192.168.10.200:8000';

export const endpoints = {
    foods: '/foods/',
    categories: '/restaurant_categories/',
    restaurant: restaurantId => `/restaurants/${restaurantId}/`,
    restaurantFoods: restaurantId => `/restaurants/${restaurantId}/foods/`,
    categoryFoods: categoryId => `/restaurant_categories/${categoryId}/foods/`,
    restaurantCategories: restaurantId => `/restaurants/${restaurantId}/categories/`,
    createCategory: restaurantId => `/restaurants/${restaurantId}/create_category/`,
    detailCategory: categoryId => `/restaurant_categories/${categoryId}/`,
    createFood: restaurantId => `/restaurants/${restaurantId}/create_food/`,
    detailFood: foodId => `/foods/${foodId}/`,
};

const RestaurantAPIs = axios.create({
    baseURL: BASE_URL,
});

export default RestaurantAPIs;
