import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const BASE_URL = 'http://192.168.1.16:8000';

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
    statusFood: foodId => `/foods/${foodId}/set_status_food/`,
    restaurantMenus: restaurantId => `/restaurants/${restaurantId}/menus/`,
    createMenu: restaurantId => `/restaurants/${restaurantId}/create_menu/`,
    detailMenu: menuId => `/menus/${menuId}/`,

    statusRestaurant: restaurantId => `/restaurants/${restaurantId}/inactive-restaurant/`,

    getRestaurantOrder: restaurantId => `/restaurants/${restaurantId}/orders/`,
    statusOrder: orderId => `/order_restaurant/${orderId}/`,

    createRestaurant: '/restaurants/',
    createResUser: '/users/',

    categoryReport: restaurantId => `/restaurants/${restaurantId}/category_report/`,
    foodReport: restaurantId => `/restaurants/${restaurantId}/food_report/`,

    addOrder: '/orders/',
    login: '/o/token/',

    listReviewFood: foodId => `/foods/${foodId}/get_review/`,
    responseReview: reviewId => `/reviews/${reviewId}/`,
};

const RestaurantAPIs = axios.create({
    baseURL: BASE_URL,
});

export const authApis = async () => {
    const token = await AsyncStorage.getItem('token')
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export default RestaurantAPIs;
