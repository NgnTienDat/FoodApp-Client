import { useEffect, useState } from "react";
import APIs, { authApis, endpoints } from "../config/APIs";

export const useMainCategories = () => {
    const [mainCategories, setMainCategories] = useState([]);

    const loadMainCategories = async () => {
        try {
            let res = await APIs.get(endpoints['main_categories']);
            setMainCategories(res.data);
        } catch (error) {
            console.error("Error loading main categories:", error);
        }
    };

    useEffect(() => {
        loadMainCategories();
    }, []);

    return mainCategories;
};


// export const LoadOrders = (status) => {
//     const [orders, setOrders] = useState([]);

//     const getOrders = async () => {
//         try {
//             const authTokenApi = await authApis()
//             let url = `${endpoints['order']}?status=${status}`
//             const response = await authTokenApi.get(url)
//             setOrders(response.data);
//             console.log("orders: ", response.data);

//         } catch (error) {
//             console.error("Error loading orders:", error);
//         }
//     };

//     useEffect(() => {
//         getOrders();
//     }, []);

//     return orders;
// };

export const LoadOrders = async (status) => {
    try {
        const authTokenApi = await authApis();
        let url = `${endpoints['order']}?status=${status}`;
        const response = await authTokenApi.get(url);
        console.log("orders: ", response.data);
        return response.data; 
    } catch (error) {
        console.error("Error loading orders:", error);
        return [];  
    }
};

