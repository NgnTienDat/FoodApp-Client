import { useState } from "react"
import { ActivityIndicator, FlatList, FlatListComponent, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Colors from "../../config/Colors"
import { authApis, endpoints } from "../../config/APIs"
import { useNavigation } from "@react-navigation/native"

const Evaluation = ({ route }) => {
    const orderDetail = route.params?.order
    console.log('ev: ', orderDetail)

    const nav = useNavigation()

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRating = (index) => {
        setRating(index + 1);
    }

    const postEvaluation = async() => {
        try {
            setIsLoading(true)
            const data = {
                customer_comment:review,
                rate:rating,
                order_detail_id: orderDetail.id
            }
            console.info("data post: ", data);

            const authTokenApi = await authApis();
            const response = await authTokenApi.post(endpoints['reviews'], data)

            if (response.status===200) {
                console.info("Lấy giỏ hàng thành công");
            } else {
                console.error("API trả về lỗi:", res.data);

            }

            console.log('data post: ', data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
            nav.goBack()

        }
    }

    return (

        <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 10, paddingTop: 10 }}>
            {isLoading &&
                <View style={styles.loading}>
                    <ActivityIndicator size={70} color={Colors.ShoppeOrange} />
                </View>
            }
            <View style={styles.subItemContainer}>
                <Image source={{ uri: orderDetail.food.image }} style={styles.image} />
                <View style={styles.subInfo}>
                    <Text style={styles.subText}>{orderDetail.food.name}</Text>
                    <Text style={styles.subText}>{orderDetail.id}</Text>
                </View>
            </View>

            <View style={styles.ratingContainer}>
                {[...Array(5)].map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleRating(index)}
                    >
                        <Text style={[styles.star, index < rating && styles.starFilled]}>
                            ★
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={styles.ratingHint}>Đánh giá sản phẩm này *</Text>

            <TextInput
                style={styles.input}
                placeholder="Viết đánh giá ở đây"
                multiline
                maxLength={300}
                value={review}
                onChangeText={setReview}
            />
            <Text style={styles.charCounter}>{review.length}/300</Text>
            <TouchableOpacity style={styles.addLocation} onPress={postEvaluation}>
                <Text style={{ color: '#fff', fontSize: 18 }}>
                    Gửi đánh giá
                </Text>
            </TouchableOpacity>
        </View>
    )


    // return (
    //     <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 10, paddingTop: 10 }}>
    //         <Text style={{ fontSize: 19, fontWeight: 'bold', }}>{order.food.name}</Text>
    //         {/* <FlatList
    //             data={order.order_details}
    //             keyExtractor={(item) => item.id.toString()}
    //             renderItem={({ item }) => <FoodEvaluation item={item} />}
    //         />
    //         <TouchableOpacity style={styles.addLocation} >
    //             <Text style={{ color: '#fff', fontSize: 18 }}>
    //                 Gửi đánh giá
    //             </Text>
    //         </TouchableOpacity> */}
    //     </View>
    // )
}
export default Evaluation

    const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        zIndex: 10,
        top: 300,
        left: 180,
    },
    addLocation: {
        position: 'absolute', bottom: 70,
        padding: 20,
        backgroundColor: Colors.ShoppeOrange,
        width: '95%',
        justifyContent: 'center',
        alignSelf: 'center',
        marginHorizontal: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    ratingHint: {
        color: '#e74c3c',
        fontSize: 14,
        marginBottom: 20,
        alignSelf: 'center'
    },
    charCounter: {
        alignSelf: 'flex-end',
        fontSize: 12,
        color: '#888',
    },
    ratingContainer: {
        flexDirection: 'row', // Hiển thị các ngôi sao trên một hàng ngang.
        marginBottom: 5, // Khoảng cách dưới.
        justifyContent: 'center'
    },
    star: {
        fontSize: 30, // Kích thước ngôi sao.
        color: '#ddd', // Màu mặc định của ngôi sao (màu xám).
        marginHorizontal: 2, // Khoảng cách giữa các ngôi sao.
    },
    starFilled: {
        color: '#f39c12', // Màu của ngôi sao khi được chọn (vàng).
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 10,
        fontSize: 14,
        textAlignVertical: 'top',
        height: 80,
        marginBottom: 5,
    },
    subItemContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '100%',
        paddingVertical: 15,
        paddingLeft: 15,
        position: 'relative'
    },
    subInfo: {
        marginLeft: 10
    },
    subText: {
        fontSize: 18,
        fontWeight: '600'
    },
    image: {
        width: 85,
        height: 85,
        borderRadius: 6
    },
})