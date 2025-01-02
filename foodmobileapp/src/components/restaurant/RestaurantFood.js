import { View, Text, FlatList, RefreshControl, Switch, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { Searchbar, Button } from "react-native-paper";
import RestaurantStyles from "../../styles/RestaurantStyles";
import CustomerStyles from '../../styles/CustomerStyles';
import { useState, useEffect } from "react";
import RestaurantAPIs, { endpoints } from "../../config/RestaurantAPIs";

const RestaurantFood = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const restaurantId = 1
    const [page, setPage] = useState(1);
    const [foods, setFoods] = useState([]);
    const [q, setQ] = useState("");


    const loadFoods = async () => {
        if (page > 0) {
            setLoading(true)
            try {
                let url = `${endpoints['restaurantFoods'](restaurantId)}?page=${page}`
                if (q)
                    url = `${url}&q=${q}`;
                console.info(url)

                let res = await RestaurantAPIs.get(url);

                if (page > 1)
                    setFoods(current_res => [...current_res, ...res.data.results])
                else
                    setFoods(res.data.results)

                if (!res.data.next) {
                    setPage(0);
                }


            } catch (ex) {
                console.error('aaaaa' + ex);
            } finally {
                setLoading(false);
            }
        }
    }

    const [openFoods, setOpenFoods] = useState({});
    const setStatusFood = async (foodId, newStatus) => {
        setLoading(true)
        try {
            let urlSetStatus = `${endpoints['statusFood'](foodId)}`
            await RestaurantAPIs.post(urlSetStatus);
            setFoods(currentFoods =>
                currentFoods.map(food =>
                    food.id === foodId ? { ...food, is_available: newStatus } : food
                )
            );
        } catch (ex) {
            console.error('Loi doi trang thai' + ex);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        let timer = setTimeout(() => loadFoods(), 800);
        return () => clearTimeout(timer);
    }, [restaurantId, page, q]);

    const loadMore = () => {
        if (page > 0 && !loading)
            setPage(page + 1);
    }
    const refresh = () => {
        setPage(1);
        loadFoods();
    }

    const search = (value, callback) => {
        setPage(1);
        callback(value);
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={RestaurantStyles.dishCard}>
                <Searchbar style={CustomerStyles.searchInput} placeholder="Món ăn cần tìm"
                    placeholderTextColor="#999"
                    value={q} onChangeText={t => search(t, setQ)}
                />

            </View>
            {loading && <ActivityIndicator />}
            <FlatList
                refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
                onEndReached={loadMore}
                data={foods}
                keyExtractor={(item, index) => `food-${item.id}-${index}`}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[RestaurantStyles.dishCard,
                    !item.is_available && { backgroundColor: '#ccc' }]}
                        key={`${item.id}-${Math.random()}`}
                        onPress={() => navigation.navigate('detail_food', {
                            foodId: item.id,
                            onGoBack: () => refresh(),
                        })}>
                        <Image source={{ uri: item.image }} style={[RestaurantStyles.dishImage]} />
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 10 }}>
                            <Text style={RestaurantStyles.dishName}>{item.name}</Text>
                            <Text>Thành tiền: {item.price} VNĐ</Text>
                            <Text>{item.description}</Text>
                            <Text>Trạng thái: {item.is_available ? 'Còn món' : 'Hết món'}</Text>

                        </View>
                        <View style={{ flex: 1 }}>
                            <Switch
                                value={item.is_available}
                                onValueChange={(newValue) => {
                                    setOpenFoods(prev => ({ ...prev, [item.id]: newValue }));
                                    setStatusFood(item.id, newValue);
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                )}
                refreshing={loading}
                onRefresh={loadFoods}
            />


            <View >
                <Button icon="plus" mode="contained" style={[RestaurantStyles.addBtn]}
                    onPress={() => navigation.navigate('add_food', {
                        onGoBack: () => refresh(), // Gọi lại khi quay về
                    })}>
                    Thêm món ăn mới
                </Button>
            </View>
        </View>
    );
}
export default RestaurantFood;