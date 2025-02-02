import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native"
import APIs, { endpoints } from "../../config/APIs"
import Colors from "../../config/Colors"

const Reviews = ({ route }) => {
    const foodId = route.params?.foodId
    const restaurantId = route.params?.restaurantId
    console.log('food ID: ', foodId)
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1);


    const loadReviews = async () => {
        if (page <= 0) return; // Ngăn gọi API nếu không có trang tiếp theo

        try {
            setLoading(true);
            let url

            if (foodId) {
                url = `${endpoints['reviews']}?page=${page}&foodId=${foodId}`
            }

            if (restaurantId) {
                url = `${endpoints['reviews']}?page=${page}&restaurantId=${restaurantId}`
            }

            let res = await APIs.get(url); // Không cần truyền body cho GET request

            setReviews(curr_reviews =>
                page > 1 ? [...curr_reviews, ...res.data.results] : res.data.results
            );

            // Nếu không có trang tiếp theo, dừng việc nạp dữ liệu
            if (!res.data.next) setPage(0);

        } catch (error) {
            console.error('Lỗi tải đánh giá:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadReviews()
    }, [page])

    const loadMore = () => {
        if (page > 0 && !loading)
            setPage(page + 1);
    }

    const Review = ({ item }) => (
        <View style={styles.reviewContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: item.user.avatar }} style={styles.image} />
                <Text style={styles.subText}>{item.user.username}</Text>
            </View>
            <View style={{ marginLeft: 37 }}>
                <View style={styles.ratingContainer}>
                    {[...Array(item.stars)].map((_, index) => (
                        <View key={index}>
                            <Text style={{ color: '#f39c12' }}>
                                ★
                            </Text>
                        </View>
                    ))}

                </View>

                <Text style={{ fontSize: 15 }}>
                    {item.customer_comment}
                </Text>

                <Text style={{ fontSize: 14, textAlign: 'right' }}>
                    {item.created_date.replace("T", " ").split(".")[0]}
                </Text>

            </View>
        </View>
    )

    return (
        <View>
            {/* {loading &&
                <View style={styles.loading}>
                    <ActivityIndicator size={70} color={Colors.ShoppeOrange} />
                </View>
            } */}
            <FlatList
                data={reviews}
                onEndReached={loadMore}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Review item={item} />}
                refreshing={loading}
                onRefresh={loadReviews}
            />
        </View>
    )
}
export default Reviews
const styles = StyleSheet.create({
    ratingContainer: {
        flexDirection: 'row',

    },
    starFilled: {
        color: '#f39c12',
        fontSize: 20, // Kích thước ngôi sao.
        color: '#ddd', // Màu mặc định của ngôi sao (màu xám).
        marginHorizontal: 2
    },
    loading: {
        position: 'absolute',
        zIndex: 10,
        top: 300,
        left: 180,
    },
    reviewContainer: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: '#fff',
        marginTop: 1
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 20,
    },
    subText: {
        fontSize: 16,
        marginLeft: 10
    },
})