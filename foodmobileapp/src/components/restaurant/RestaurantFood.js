import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { Searchbar } from "react-native-paper";
import RestaurantStyles from "../../styles/RestaurantStyles";
import CustomerStyles from '../../styles/CustomerStyles';
import { useState, useEffect } from "react";
import RestaurantAPIs, { endpoints } from "../../config/RestaurantAPIs";

const RestaurantFood = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false)

    const loadFoods = async () => {
        try {
            setLoading(true)
            let res = await RestaurantAPIs.get(endpoints['foods'])
            setFoods(res.data.results || []);

        }
        catch (ex) {
            console.error("Failed to load foods:", ex);
            setFoods([]);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadFoods();
    }, []);

    return (
        <View>
            <View style={RestaurantStyles.dishCard}>
                <Searchbar style={CustomerStyles.searchInput} placeholder="Món ăn cần tìm"
                    placeholderTextColor="#999"></Searchbar>
            </View>
            {loading && <ActivityIndicator />}
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {foods.map((f) => (
                    <TouchableOpacity style={[RestaurantStyles.dishCard]} key={f.id}>
                        <Image source={{ uri: f.image }} style={RestaurantStyles.dishImage} />
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 10 }}>
                            <Text style={RestaurantStyles.dishName}>{f.name}</Text>
                            <Text>Thành tiền: {f.price} VNĐ</Text>
                            <Text>{f.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
export default RestaurantFood;