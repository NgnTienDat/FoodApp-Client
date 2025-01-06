import { useEffect, useState } from "react";
import { View, Text, FlatList, RefreshControl, Switch, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { Searchbar, Button } from "react-native-paper";
import RestaurantStyles from "../../../styles/RestaurantStyles";
import RestaurantAPIs, { endpoints } from "../../../config/RestaurantAPIs";
import CustomerStyles from '../../../styles/CustomerStyles';

const RestaurantMenuFood = ({ navigation }) => {
    const restaurantId = 1
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(false)
    const [q, setQ] = useState("");

    const loadMenus = async () => {
        setLoading(true)
        try {
            let url = `${endpoints['restaurantMenus'](restaurantId)}`
            if (q) {
                url = `${url}?q=${q}`;
            }
            const res = await RestaurantAPIs.get(url)
            // console.info(res.data)
            setMenus(res.data)

        } catch (ex) {
            console.error('Loi tai menu: ' + ex);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        let timer = setTimeout(() => loadMenus(), 800);
        return () => clearTimeout(timer);
    }, [restaurantId, q]);
    const refresh = () => {
        loadMenus();
    }
    const search = (value, callback) => {
        callback(value);
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={RestaurantStyles.dishCard}>
                <Searchbar style={CustomerStyles.searchInput} placeholder="Menu cần tìm"
                    placeholderTextColor="#999"
                    value={q} onChangeText={t => search(t, setQ)}
                />

            </View>
            {loading && <ActivityIndicator />}
            <FlatList
                refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
                data={menus}
                keyExtractor={(item, index) => `menu-${item.id}-${index}`}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[RestaurantStyles.dishCard]}
                        key={`${item.id}-${Math.random()}`}
                        onPress={() => navigation.navigate('detail_menu',
                            {
                                menuId: item.id,
                                onGoBack: () => refresh(),
                            }
                        )}
                    >
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 10 }}>
                            <Text style={RestaurantStyles.dishName}>{item.name}</Text>
                            <Text >Phục vụ: {item.serve_period}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                refreshing={loading}

            />


            <View >
                <Button icon="plus" mode="contained" style={[RestaurantStyles.addBtn]}
                    onPress={() => navigation.navigate('add_menu'
                        , {
                            onGoBack: () => refresh(), // Gọi lại khi quay về
                        }
                    )}
                >
                    Thêm menu
                </Button>
            </View>
        </View>
    );
}
export default RestaurantMenuFood;