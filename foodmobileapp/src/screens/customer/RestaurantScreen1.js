import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, StyleSheet, ImageBackground, StatusBar, ActivityIndicator, ScrollView, Dimensions, TouchableHighlight, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-paper';
import APIs, { authApis, endpoints } from '../../config/APIs';
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useScrollViewOffset, useSharedValue } from 'react-native-reanimated';
import { FoodItem } from '../../components/customer/RestaurantItem';
import BackButton from '../../components/customer/BackButton';
import Colors from '../../config/Colors';
import { MyUserContext } from '../../config/UserContexts';
import PriceFormatter from '../../components/customer/FormatPrice';





const IMG_HEIGHT = 200;
const HEADER_HEIGHT = 100;

const RestaurantScreen1 = ({ route }) => {
    const restaurantId = route.params?.RestaurantId
    const [searchQuery, setSearchQuery] = useState('')
    const [restaurant, setRestaurant] = useState(null)
    const [foods, setFoods] = useState([])
    const [loading, setLoading] = useState(false)
    const [follow, setFollow] = useState(false)
    const [subCart, setSubCart] = useState(null)
    const user = useContext(MyUserContext)
    const nav = useNavigation()
    const isFocused = useIsFocused()






    const loadRestaurant = async () => {
        try {
            setLoading(true);

            let res = await APIs.get(endpoints['restaurant-detail'](restaurantId));
            console.info(res.data)
            setRestaurant(res.data);


            const authTokenApi = await authApis()
            const resFollow = await authTokenApi.get(endpoints['follow-restaurant'](restaurantId))
            console.log('res is follow: ', resFollow.data)
            setFollow(resFollow.data.is_following)


        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    const loadFood = async () => {
        try {
            setLoading(true);
            let res = await APIs.get(endpoints['restaurant-foods'](restaurantId));
            console.info('FOODS', res.data)
            setFoods(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }


    const loadSubCart = async () => {
        try {
            const params = {
                restaurantId: restaurantId,
                userId: user.id,
            }

            let res = await APIs.get(endpoints['restaurant-sub-cart'], { params });
            setSubCart(res.data)



            if (res.status === 200) {
                console.info("Giỏ hàng nhỏ của bạn: \n", res.data);
                console.info("Lấy giỏ hàng thành công");
            } else {
                console.error("API trả về lỗi:", res.data);
            }

        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.info("Không tìm thấy giỏ hàng.")
                setSubCart(null)
            } else {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        if (isFocused) {

            loadRestaurant();
            loadFood();
            if (user) {
                loadSubCart()
            }
        }
    }, [restaurantId, isFocused]);

    const toggle = () => {
        setFollow(!follow)
    }

    const handlePressFollow = async (restaurantId) => {
        try {
            const authTokenApi = await authApis()
            const response = await authTokenApi.post(endpoints['follow-restaurant'](restaurantId))

            if (response.status === 200) {

                console.info('Thao tác Theo dõi!')
            } else {
                console.error('Lỗi: ', response.data);
            }
        } catch (error) {
            console.error('error: ', error);
        }
    }




    const items = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);

    return (
        <SafeAreaView style={styles.container}>

            <View style={[styles.header,]}>
                {restaurant && (
                    <Text style={styles.restaurantNameHeader}>{restaurant.name}</Text>
                )}
            </View>
            <BackButton />

            {/* {restaurant && <ActivityIndicator size={'large'}/>} */}

            <ScrollView
                stickyHeaderIndices={[2]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}

            >
                {restaurant &&
                    <Image
                        source={{ uri: restaurant.image }}
                        style={[styles.restaurantImage,]}
                    />
                }

                {restaurant &&
                    <View style={styles.restaurantInfo}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.restaurantName}>{restaurant.name}</Text>
                            <TouchableOpacity style={styles.followButton}
                                onPress={() => {
                                    setFollow(!follow)
                                    handlePressFollow(restaurantId)
                                }}>
                                <Text style={{ color: '#fff' }}>
                                    {follow === false ? 'Theo dõi' : 'Bỏ theo dõi'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.restaurantDetails}>
                            <Text style={styles.rating}>⭐ {restaurant.star_rate}</Text>
                            <Text style={styles.address}>Địa chỉ: {restaurant.address}</Text>
                        </View>
                        <Text style={{  textAlign: 'right' ,fontSize: 17, color: '#EE4D2D' }}
                                onPress={() => nav.navigate('ReviewsScreen', {'restaurantId': restaurantId})}
                            >Xem đánh giá</Text>
                    </View>
                }

                {restaurant &&
                    <View style={{ backgroundColor: '#fff' }}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Tìm món ăn"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {items.map((item, index) => (
                                <TouchableOpacity key={index} style={{ padding: 20, backgroundColor: '#ccc' }}>
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                }

                {foods.map((item, index) =>
                    <FoodItem key={index} item={item} routeName="FoodDetail" params={{ "FoodId": item.id }} />
                )}
            </ScrollView>


            {subCart &&
                <View style={styles.bottomSubCart}>
                    <TouchableOpacity style={styles.subCartButton}>
                        <Icon source="cart-outline" size={30} color="black" />
                        <Text style={styles.textCommon}>{subCart.total_quantity}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.orderButton}
                        onPress={() => nav.navigate('PlaceOrderScreen', { "restaurant": restaurant })}

                    >
                        <Text style={styles.orderText}>
                            Xem đơn hàng .
                            <PriceFormatter price={subCart.total_price} />
                        </Text>
                    </TouchableOpacity>
                </View>
            }


        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        position: 'relative'
    },
    orderText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600'
    },
    textCommon: {
        fontSize: 20,
        fontWeight: '600',
        marginLeft: 10
    },
    orderButton: {
        height: 50, width: 270,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        marginLeft: 10,
        backgroundColor: Colors.ShoppeOrange
    },
    subCartButton: {
        backgroundColor: '#ccc',
        height: 50, width: 90,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        flexDirection: 'row'
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        // position: 'absolute',
        height: HEADER_HEIGHT,
        // zIndex: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSubCart: {
        flexDirection: 'row',
        paddingVertical: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        // display: 'none'
    },
    backButton: {
        top: 50,
        left: 10,
        padding: 8,
        backgroundColor: '#a49d997d',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        position: 'absolute'
    },
    followButton: {
        backgroundColor: Colors.ShoppeOrange,
        borderRadius: 4,
        width: 85,
        height: 27,
        justifyContent: 'center',
        alignItems: 'center'
    },
    restaurantInfo: {
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        paddingVertical: 10,
    },
    restaurantName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    restaurantDetails: {
        flexDirection: 'row',
        marginTop: 5
    },
    rating: {
        fontSize: 16,
        marginRight: 10
    },
    address: {
        fontSize: 16,
        color: '#666',
        flexWrap: 'wrap',
        width: '90%',
    },
    searchContainer: {
        backgroundColor: '#fff',
        padding: 7,
        width: '100%',
        height: 113,
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
    foodItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    foodImage: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 5
    },
    foodInfo: {
        flex: 1
    },
    foodName: {
        fontSize: 16
    },
    foodPrice: {
        fontSize: 18,
        color: '#EE4D2D',
        fontWeight: 'bold'
    },
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
    restaurantImage: {

        height: IMG_HEIGHT,
    },
    restaurantNameHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 50,
        marginTop: 37
    }
});

export default RestaurantScreen1;
{/* <View style={{ flex: 1 }}> */ }
{/* <TouchableOpacity style={styles.backButton} onPress={() => nav.goBack()}>
        <Icon source="arrow-left" size={24} color="#fff" />
    </TouchableOpacity> */}


{/* </View> */ }


{/* {foods &&
                <FlatList
                    ListHeaderComponent={() => {
                    }}
                    contentContainerStyle={{ marginTop: 300 }}
                    data={foods}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.foodItem}>
                            <Image source={{ uri: item.image }} style={styles.foodImage} />
                            <View style={styles.foodInfo}>
                                <Text style={styles.foodName}>{item.name}</Text>
                                <Text style={styles.foodPrice}>{item.description}</Text>
                                <Text style={styles.foodPrice}>{formatPrice(item.price)}đ</Text>
                            </View>
                            <TouchableOpacity style={styles.addButton}>
                                <Text style={styles.addText}>+</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                    />
                } */}


// const scrollY = useSharedValue(0);

// const scrollHandler = useAnimatedScrollHandler((event) => {
//     scrollY.value = event.contentOffset.y;
// });


// const headerViewAnimatedStyles = useAnimatedStyle(() => {
//     const backgroundColor = interpolateColor(
//         scrollY.value,
//         [0, 320],
//         ['transparent', '#fff'],

//     )
//     return { backgroundColor }
// })