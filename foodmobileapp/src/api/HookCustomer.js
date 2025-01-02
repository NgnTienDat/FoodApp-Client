import { useEffect, useState } from "react";
import APIs, { endpoints } from "../config/APIs";

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