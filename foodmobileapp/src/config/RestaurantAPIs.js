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
    statusFood: foodId => `/foods/${foodId}/set_status_food/`,
    restaurantMenus: restaurantId => `/restaurants/${restaurantId}/menus/`,
    createMenu: restaurantId => `/restaurants/${restaurantId}/create_menu/`,
    detailMenu: menuId => `/menus/${menuId}/`,

    statusRestaurant: restaurantId => `/restaurants/${restaurantId}/inactive-restaurant/`,

    getOrder: '/orders/',
    statusOrder: orderId => `/orders/${orderId}/`,

    createRestaurant: '/restaurants/',
    createResUser: '/users/'
};

const RestaurantAPIs = axios.create({
    baseURL: BASE_URL,
});

export default RestaurantAPIs;
