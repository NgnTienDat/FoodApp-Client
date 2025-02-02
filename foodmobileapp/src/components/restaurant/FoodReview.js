import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { useContext } from "react";
import { MyUserContext } from "../../config/UserContexts";
import RestaurantAPIs, { authApis, endpoints } from "../../config/RestaurantAPIs";
import RestaurantStyles from "../../styles/RestaurantStyles";


const FoodReview = ({ navigation, route }) => {
    const [replyTexts, setReplyTexts] = useState({});


    const user = useContext(MyUserContext)
    const restaurantId = user.restaurant_id
    const { foodId } = route.params || {};
    const [detail_food, setDetailFood] = useState({})
    const [list_review, setListReview] = useState([])


    const loadDetailFood = async () => {
        try {
            let url = `${endpoints['detailFood'](foodId)}`
            let res = await RestaurantAPIs.get(url)
            // console.log(res.data)
            setDetailFood(res.data)
        } catch (ex) {
            console.error('lỗi' + ex);
        } finally {
            setLoading(false);
        }
    }

    const loadListReview = async () => {
        try {
            let url = `${endpoints['listReviewFood'](foodId)}`
            let res = await RestaurantAPIs.get(url)
            // console.log(JSON.stringify(res.data, null, 2));
            setListReview(res.data)
        } catch (ex) {
            console.error('lỗi' + ex);
        } finally {
            setLoading(false);
        }
    }
    const handleReplyTextChange = (text, reviewId) => {
        setReplyTexts(prev => ({
            ...prev,
            [reviewId]: text
        }));
    };

    const replyReview = async (reviewId) => {
        if (!replyTexts[reviewId]?.trim()) {
            Alert.alert('Thông báo', "Vui lòng nhập phản hồi trước khi gửi!");
            return;
        }
        try {
            const data = {
                restaurant_reply: replyTexts[reviewId]
            }
            const authTokenApi = await authApis()
            const response = await authTokenApi.patch(`${endpoints['responseReview'](reviewId)}`, data)

            if (response.status === 200) {
                console.log(response.data);
                Alert.alert('Thành công', 'Phản hồi đã được gửi!');
                setReplyTexts(prev => ({ ...prev, [reviewId]: '' }));
                loadListReview();
            }
        } catch (ex) {
            console.error('Lỗi: ' + ex);
        }
    };

    useEffect(() => {
        loadDetailFood();
        loadListReview();
    }, [restaurantId]);


    return (
        <View style={styles.container}>
            <View style={styles.dishInfoContainer}>
                <View style={styles.dishInfoLeft}>
                    <Text style={styles.reviewTitle}>{detail_food.name}</Text>
                    <Text style={styles.dishPrice}>{new Intl.NumberFormat('vi-VN').format(detail_food.price)}</Text>
                    <Text style={styles.dishDescription}>{detail_food.description}</Text>
                </View>
                <View style={styles.dishInfoRight}>
                    <Image source={{ uri: detail_food.image }} style={styles.dishImage} />
                </View>
            </View>


            <Text style={styles.reviewTitle}>Đánh giá từ khách hàng</Text>
            <FlatList
                data={list_review}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.reviewItem}>
                        <Text style={styles.userName}>{item.username}</Text>
                        <Text style={styles.rating}>⭐ {item.stars}</Text>
                        <Text style={styles.comment}>Đánh giá: {item.customer_comment}</Text>
                        {item.restaurant_comment ? (
                            <Text style={styles.reply}>Đã phản hồi: {item.restaurant_comment.content}</Text>
                        ) : (
                            <View>
                                <TextInput
                                    style={styles.replyInput}
                                    placeholder="Nhập phản hồi..."
                                    value={replyTexts[item.id] || ""}
                                    onChangeText={(text) => handleReplyTextChange(text, item.id)}
                                />
                                <TouchableOpacity style={styles.buttonContainer} onPress={() => replyReview(item.id)}>
                                    <Text style={RestaurantStyles.btnText}>Gửi phản hồi</Text>
                                </TouchableOpacity>


                            </View>
                        )}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#fff" },
    dishInfoContainer: { flexDirection: "row", marginBottom: 20 },
    dishInfoLeft: { flex: 1, paddingRight: 10 },
    dishInfoRight: { justifyContent: "center" },
    dishPrice: { fontSize: 18, color: "green", fontWeight: "bold" },
    dishDescription: { fontSize: 14, color: "gray" },
    dishImage: { width: 100, height: 100, borderRadius: 8 },
    reviewTitle: { fontSize: 20, fontWeight: "bold", marginTop: 10 },
    reviewItem: { marginTop: 10, padding: 10, backgroundColor: "#f8f8f8", borderRadius: 8 },
    userName: { fontWeight: "bold" },
    rating: { color: "orange" },
    comment: { fontSize: 14, marginTop: 5 },
    reply: { fontSize: 14, marginTop: 5, color: "blue", fontStyle: "italic" },
    replyInput: { fontSize: 14, marginTop: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 5 },
    buttonContainer: {
        backgroundColor: '#EE4D2D',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 5,
    },
});

export default FoodReview;
