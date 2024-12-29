import { View, Text, TouchableOpacity, RefreshControl, FlatList, ActivityIndicator } from "react-native";
import RestaurantStyles from "../../styles/RestaurantStyles";
import { Searchbar, Button } from "react-native-paper";
import { useEffect, useState, useCallback } from "react";
import RestaurantAPIs, { endpoints } from "../../config/RestaurantAPIs";
import CustomerStyles from '../../styles/CustomerStyles';


const RestaurantCategoryFood = ({ navigation }) => {
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

                const categories = res.data.results;
                console.log(categories);

                if (page > 1)
                    setRestaurantCategories(current_res => [...current_res, ...res.data.results])
                else
                    setRestaurantCategories(res.data.results)

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
        <View style={{ flex: 1 }}>
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
                    <TouchableOpacity style={[RestaurantStyles.containerCardMenu]}
                        key={`${item.id}-${Math.random()}`}

                        onPress={() => navigation.navigate('detail_category', {
                            categoryId: item.id,
                            onGoBack: () => refresh(),
                        })}>
                        <Text style={RestaurantStyles.cardChoiceName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                refreshing={loading}
                onRefresh={loadCategories}
            />

            <Button icon="plus" mode="contained" style={[RestaurantStyles.addBtn]}
                onPress={() => navigation.navigate('add_category', {
                    onGoBack: () => refresh(), // Gọi lại khi quay về
                })}>
                Thêm danh mục mới
            </Button>
        </View >
    );
}
export default RestaurantCategoryFood;