import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import CustomerStyles from "../../styles/CustomerStyles"
import BackButton from "../../components/customer/BackButton"
import { useContext, useEffect, useState } from "react"
import APIs, { authApis, endpoints } from "../../config/APIs"
import { StatusBar } from "expo-status-bar"
import Separator from "../../components/customer/Separator"
import Display from "../../utils/Display"
import { Icon } from "react-native-paper"
import CustomButton from "../../components/common/Button"
import { MyUserContext } from "../../config/UserContexts"
import { useNavigation } from "@react-navigation/native"
import PriceFormatter from "../../components/customer/FormatPrice"
import { CartContext } from "../../config/CartContext"    

const FoodDetail = ({ route }) => {
    const foodId = route.params?.FoodId
    console.log('food id: ', foodId)
    const [food, setFood] = useState([])
    const [loading, setLoading] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [note, setNote] = useState('')
    const user = useContext(MyUserContext)
    const {cart, setItemNumbers, itemNumbers} = useContext(CartContext)
    const nav = useNavigation()





    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price)
    };

    const loadFood = async () => {
        try {
            setLoading(true);
            let res = await APIs.get(endpoints['food-detail'](foodId));
            setItemNumbers(itemNumbers+1)
            console.info('FOOD DETAIL: ', res.data)
            setFood(res.data);

        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadFood()
    }, [foodId])


    const addToCart = async () => {
        try {

            if (!user) {
                console.log("Chua dang nhap");
                nav.navigate('LoginScreen');
                return;
            }


            const api = await authApis();

            const data = {
                food_id: food.id,
                quantity: quantity,
                note: note,
            };


            const response = await api.post(endpoints['add-to-cart'], data);


            if (response.status === 200) {
                console.info('Added to cart!');
                console.info('FOOD RES ID: ', food.restaurant.id);


                // nav.navigate('RestaurantScreen', {"RestaurantId": food.restaurant.id})
                nav.goBack()

            } else {
                console.error('Failed to add to cart', response.data);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };


    return (
        <View style={CustomerStyles.container}>
            <StatusBar style="default" translucent backgroundColor="transparent" />
            <>
                <Image
                    source={{ uri: food.image }}
                    style={styles.backgroundImage}
                />

                <BackButton />
                <ScrollView contentContainerStyle={{}}>
                    <Separator height={Display.setHeight(35)} />
                    <View style={styles.mainContainer}>
                        <View style={styles.foodInfo}>
                            <Text style={styles.foodName}>{food?.name}</Text>
                            <Text style={styles.foodPrice}>
                                {food &&
                                    <PriceFormatter price={food.price} />
                                }
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <View style={styles.foodRatingContainer}>
                                <Icon source='star-outline' size={22} color="gold" />
                                <Text style={styles.foodRating}>{food.star_rate}</Text>
                            </View>

                            <Text style={{ marginLeft: 240, fontSize: 17, color: '#EE4D2D' }}
                                onPress={() => nav.navigate('ReviewsScreen', {'foodId': foodId})}
                            >Xem đánh giá</Text>
                        </View>

                        <Text style={styles.foodDescription}>Mô tả: {food?.description}</Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.noteInput}
                            placeholder="Nhập ghi chú cho món ăn..."
                            multiline={true}
                            numberOfLines={4}
                            maxLength={200}
                            onChangeText={(text) => setNote(text)}
                            value={note}
                        />
                    </View>


                </ScrollView>
                <View style={styles.footer}>
                    <View style={styles.priceCounterContainer}>
                        <Text style={styles.totalPrice}>{formatPrice(food?.price * quantity)}đ</Text>

                        <View style={styles.counterContainer}>
                            <TouchableOpacity style={styles.addButton}
                                onPress={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)}
                            >
                                <Text style={styles.addText}>-</Text>
                            </TouchableOpacity>

                            <Text style={styles.quantityText}>{quantity}</Text>

                            <TouchableOpacity style={styles.addButton}
                                onPress={() => setQuantity(prev => prev + 1)}

                            >
                                <Text style={styles.addText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <CustomButton name='Thêm vào giỏ hàng' route={addToCart} />
                </View>

            </>
        </View>
    )
}

const styles = StyleSheet.create({
    addButton: {
        width: 30,
        height: 30,
        borderRadius: 5,
        backgroundColor: '#EE4D2D',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    },
    foodInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'nowrap'
    },
    foodRatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 2
    },
    foodRating: {
        fontSize: 18,
        color: 'gray',
        marginLeft: 5
    },
    foodName: {
        fontSize: 22,
        fontWeight: '500',
        flexShrink: 1, // Giúp text thu nhỏ khi không đủ không gian
        marginRight: 10,
    },
    foodPrice: {
        fontSize: 22,
        color: '#333',
        fontWeight: '500'
    },
    foodDescription: {
        fontSize: 16,
        color: '#555',
        marginVertical: 15,
    },
    footer: {
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        height: 145,
    },
    backgroundImage: {
        position: 'absolute',
        height: 400,
        top: 0,
        width: '100%',

    },
    mainContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    titleContainer: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    totalPrice: {
        // backgroundColor: 'gray',
        fontSize: 22,
        fontWeight: '500'

    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginBottom: 5,
        marginHorizontal: 5
    },
    quantityText: {
        fontSize: 20,
        marginHorizontal: 15,

        paddingHorizontal: 10,
        borderRadius: 5
    },
    noteInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        height: 100,
        textAlignVertical: 'top', // Đưa text về phía trên
        margin: 7,
        backgroundColor: '#F9F9F9',
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    priceCounterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingTop: 13
    },

})
export default FoodDetail