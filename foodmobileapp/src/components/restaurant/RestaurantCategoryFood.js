import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, ActivityIndicator } from "react-native";
import RestaurantStyles from "../../styles/RestaurantStyles";
import { Searchbar } from "react-native-paper";
import { useEffect, useState } from "react";
import RestaurantAPIs, { endpoints } from "../../config/RestaurantAPIs";
import CustomerStyles from '../../styles/CustomerStyles';

const RestaurantCategoryFood = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false)
    const [q, setQ] = useState("");

    const loadFoodCates = async () => {
        try {
            setLoading(true);
            let res = await RestaurantAPIs.get(endpoints['categories']);
            setCategories(res.data.results || []);
        } catch (error) {
            console.error("Failed to load categories:", error);
            setCategories([]);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        loadFoodCates();
    }, []);

    return (
        <View>
            <View style={RestaurantStyles.dishCard}>
                <Searchbar style={CustomerStyles.searchInput} placeholder="Danh mục món cần tìm"
                    placeholderTextColor="#999"
                    value={q} onChangeText={t => setQ(t)} />
            </View>
            {loading && <ActivityIndicator />}
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {categories.map((c) => (
                    <TouchableOpacity style={RestaurantStyles.dishCard} key={c.id}>
                        <Image source={{ uri: c.image }} style={RestaurantStyles.dishImage} />
                        <Text style={RestaurantStyles.dishName}>{c.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View >
    );
}
export default RestaurantCategoryFood;