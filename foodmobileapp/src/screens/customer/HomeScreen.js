import { useEffect, useState } from "react"
import APIs, { endpoints } from "../../config/APIs"
import { FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { HomeHeader, MainCategory } from "../../components/customer/HomeHeader"
import CustomerStyles from "../../styles/CustomerStyles"



const HomeScreen = () => {

    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);


    const loadRestaurants = async () => {
        try {
            if (page > 0) {
                let url = `${endpoints['restaurants']}?page=${page}` // lấy url nhà hàng kèm trang
                setLoading(true)
                let res = await APIs.get(url) // gọi api lấy danh sách nhà hàng
                if (page > 1) // nếu page > 1 nghĩa là chuyển trang thì 
                    // nạp danh sách từ trang mới gộp với danh sách từ trang trước. Nghĩa là không đè lên ds hiện tại
                    setRestaurants(current_res => [...current_res, ...res.data.results])
                else
                    setRestaurants(res.data.results)

                if (res.data.next === null)
                    setPage(0);
            }

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {

        loadRestaurants()
    }, [page])

    const loadMore = () => {
        if (page > 0 && !loading)
            setPage(page + 1);
    }
    return (

        <View style={CustomerStyles.container}>
            <HomeHeader />

            <FlatList
                ListHeaderComponent={MainCategory}
                data={restaurants}
                onEndReached={loadMore}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={CustomerStyles.flatListNearRestaurant}>
                        <Image
                            source={{ uri: item.image }}
                            style={CustomerStyles.flatListNearRestaurantImage}
                        />
                        <View style={{ marginLeft: 10, flex: 1 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{item.name}</Text>
                            <Text>{item.address}</Text>
                            <Text style={{ marginTop: 5 }}>⭐ {item.star_rate}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                refreshing={loading}
                onRefresh={loadRestaurants}
            />

        </View>


    )
}
export default HomeScreen;