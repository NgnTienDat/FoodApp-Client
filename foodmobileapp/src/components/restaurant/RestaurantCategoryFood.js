import { View, Text, TouchableOpacity, RefreshControl, Image, FlatList, ActivityIndicator } from "react-native";
import RestaurantStyles from "../../styles/RestaurantStyles";
import { Searchbar } from "react-native-paper";
import { useEffect, useState } from "react";
import RestaurantAPIs, { endpoints } from "../../config/RestaurantAPIs";
import CustomerStyles from '../../styles/CustomerStyles';

const RestaurantCategoryFood = () => {
    const [loading, setLoading] = useState(false)
    const [restaurantCategories, setRestaurantCategories] = useState([]);
    const restaurantId = 1
    const [page, setPage] = useState(1);
    const [q, setQ] = useState("");

    const loadCategories = async () => {
        if (page > 0) {
            setLoading(true)
            try {
                let url = `${endpoints['restaurantCategories'](restaurantId)}?page=${page}`
                if (q)
                    url = `${url}&q=${q}`;
                console.info(url)

                let res = await RestaurantAPIs.get(url);
                console.info(res.data.next)

                if (page > 1)
                    setRestaurantCategories(current_res => [...current_res, ...res.data])
                else
                    setRestaurantCategories(res.data)

                if (!res.data.next) {
                    setPage(0);
                }


            } catch (ex) {
                console.error('aaaaa' + ex);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        let timer = setTimeout(() => loadCategories(), 800);
        return () => clearTimeout(timer);

    }, [restaurantId, page, q]);
    const loadMore = () => {
        if (page > 0 && !loading)
            setPage(page + 1);
    }
    const refresh = () => {
        setPage(1);
        loadCategories();
    }

    const search = (value, callback) => {
        setPage(1);
        callback(value);
    }
    return (
        <View>
            <View style={RestaurantStyles.dishCard}>
                <Searchbar style={CustomerStyles.searchInput} placeholder="Danh mục món cần tìm"
                    placeholderTextColor="#999"
                    value={q} onChangeText={t => search(t, setQ)} />
            </View>
            {loading && <ActivityIndicator />}

            <FlatList
                refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
                onEndReached={loadMore}
                data={restaurantCategories}
                keyExtractor={(item, index) => `category-${item.id}-${index}`}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[RestaurantStyles.dishCard]} key={`${item.id}-${Math.random()}`}>
                        <Image source={{ uri: item.image }} style={RestaurantStyles.dishImage} />
                        <Text style={RestaurantStyles.dishName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View >
    );
}
export default RestaurantCategoryFood;