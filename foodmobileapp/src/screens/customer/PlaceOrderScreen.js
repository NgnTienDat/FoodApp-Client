import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { ActivityIndicator, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { MyUserContext } from "../../config/UserContexts"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import APIs, { authApis, endpoints } from "../../config/APIs"
import PriceFormatter from "../../components/customer/FormatPrice"
import Colors from "../../config/Colors"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Icon } from "react-native-paper"
import { GeocodingAddress, GetSavedLocation, ReturnDistance } from "../../components/common/CurrentLocation"
import axios from "axios"

const PlaceOrderScreen = ({ route }) => {
    const restaurant = route.params?.restaurant
    console.log('restaurant deatail: ', restaurant)
    const restaurantId = restaurant.id
    const [subCart, setSubCart] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const [count, setCount] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [priceBS, setPriceBS] = useState(0)
    const [paymentMethod, setPaymentMethod] = useState('cash')
    const user = useContext(MyUserContext)
    const snapPoints = useMemo(() => ['80%'], [])
    const bottomSheetRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [initCount, setInitCount] = useState(0)
    const [currentLocation, setCurrentLocation] = useState(null)
    const [deliveryFee, setDeliveryFee] = useState(0)
    const isFocused = useIsFocused()
    const nav = useNavigation()





    const loadSubCart = async () => {
        try {
            const params = {
                restaurantId: restaurantId,
                userId: user.id,
            }

            let res = await APIs.get(endpoints['restaurant-sub-cart'], { params });
            setSubCart(res.data)


            // console.log('subcart id: ', res.data)


            if (res.status === 200) {
                console.info("Giỏ hàng nhỏ của bạn subcart: \n", res.data);
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



    const handleDeliveryFee = async () => {
        try {
            const savedLocation = await GetSavedLocation()
            const destinationAddress = savedLocation.formattedAddress
            const originAddress = restaurant.address

            console.log('destinationAddress info: ', destinationAddress)
            console.log('originAddress info: ', originAddress)


            const restaurantPlaceId = await GeocodingAddress(originAddress)
            console.log('restaurantPlaceId info: ', restaurantPlaceId)

            const deliveryPlaceId = await GeocodingAddress(destinationAddress)
            console.log('deliveryPlaceId info: ', deliveryPlaceId)

            const distanceInfo = await ReturnDistance(restaurantPlaceId, deliveryPlaceId)
            console.log('distance info: ', distanceInfo.value)

            const distance = Math.trunc(distanceInfo.value / 1000)
            console.log('deliveryDistance KM: ', distance)
            const delivery_fee = restaurant.shipping_fee * distance
            setDeliveryFee(delivery_fee)

            console.log('shipping fee: ', delivery_fee)



        } catch (error) {

        }
    }

    const checkout = async () => {
        try {
            setIsLoading(true)
            const data = {
                sub_cart_id: subCart.id,
                address_id: currentLocation.id,
                shipping_fee: deliveryFee,
                total_price: subCart.total_price + deliveryFee,
                payment: paymentMethod,
            }
            if (paymentMethod === 'momo') {
                const momoData = {
                    amount: subCart.total_price,
                    orderInfo: `Thanh toán đơn hàng ${subCart.id}`
                }
                const responseMomo = await APIs.post(endpoints['momo-payment'], momoData)
                const responseMomoData = responseMomo.data
                console.log('momo: ', responseMomoData.deeplink)

                if (responseMomo && responseMomoData.deeplink) {
                    Linking.openURL(responseMomoData.deeplink);
                }
            }

            const authTokenApi = await authApis()
            const response = await authTokenApi.post(endpoints['order'], data)

            if (response.status === 200) {

                console.info('Đặt hàng thành công!');
                nav.navigate('AfterOrderScreen')
            } else {
                console.error('Lỗi: ', response.data);
            }

        } catch (error) {
            console.error('error: ', error);
        } finally {
            setIsLoading(false)
        }

    }

    const handleUpdateDish = async (itemId) => {
        try {
            bottomSheetRef.current.close()
            setIsLoading(true)
            const data = {
                sub_cart_item_id: itemId,
                quantity: count,
            }

            const response = await APIs.patch(endpoints['update-sub-cart-item'], data)

            if (response.status === 200) {
                await loadSubCart()
                console.info('Cập nhật thành công!');
            } else {
                console.error('Cập nhật KHÔNG thành công', response.data);
            }

        } catch (error) {
            console.error('Lỗi cập nhật: ', error);
        } finally {
            setIsLoading(false)
            setCount(0)
        }
    }

    const getSavedLocation = async () => {
        const savedLocation = await GetSavedLocation()
        if (savedLocation) {
            // console.log('Location: ', savedLocation)
            setCurrentLocation(savedLocation)
        }
    }
    const isDisabled = count === 0

    useEffect(() => {
        if (isFocused) {
            getSavedLocation()
            loadSubCart()
            handleDeliveryFee()
        }

    }, [restaurantId, isFocused]);


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ position: 'relative', flex: 1 }}>

                {isLoading &&
                    <View style={styles.loading}>
                        <ActivityIndicator size={70} color={Colors.ShoppeOrange} />
                    </View>
                }


                {subCart &&
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.myAddress}>
                            <TouchableOpacity
                                onPress={() => nav.navigate('LocationDelivery')}
                            >
                                <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                                    <Icon source="map-marker-outline" size={20} />
                                    <Text >Địa chỉ giao hàng:</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                                    <Text > {currentLocation.receiver}    |    </Text>
                                    <Text >{currentLocation.phone}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                                    <Text > {currentLocation.formattedAddress}</Text>
                                </View>

                            </TouchableOpacity>
                        </View>
                        {
                            subCart.sub_cart_items.map((item, index) => (
                                <TouchableOpacity style={styles.subItemContainer} key={index}
                                    onPress={() => {
                                        setSelectedItem(item)
                                        setQuantity(item.quantity)
                                        setPriceBS(item.price)
                                        bottomSheetRef.current.expand()
                                    }}
                                >
                                    <Image source={{ uri: item.food.image }} style={styles.image} />
                                    <View style={styles.subInfo}>
                                        <Text style={styles.subText}>{item.food.name}</Text>
                                        <Text style={styles.subQuantity}>Số lượng: {item.quantity}</Text>
                                    </View>
                                    <Text style={styles.subPrice}>
                                        <PriceFormatter price={item.food.price} />
                                    </Text>
                                </TouchableOpacity>
                            ))
                        }
                        <View style={styles.paymentInfo}>

                            <Text style={{ fontSize: 20, fontWeight: '600' }}>Chi tiết thanh toán</Text>
                            <View style={styles.bottomHeader}>
                                <Text style={styles.text}>Tạm tính  ({subCart.total_quantity} phần)</Text>
                                <Text style={styles.text}><PriceFormatter price={subCart.total_price} /></Text>
                            </View>

                            <View style={styles.bottomHeader}>
                                <Text style={styles.text}>Phí vận chuyển</Text>
                                <Text style={styles.text}>
                                    {deliveryFee &&
                                        <PriceFormatter price={deliveryFee} />
                                    }
                                </Text>
                            </View>

                        </View>

                    </ScrollView>


                }
                {subCart &&
                    <View style={styles.bottomContainer}>
                        <View style={styles.bottomHeader}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tổng tiền</Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                <PriceFormatter price={subCart.total_price + deliveryFee} />
                            </Text>
                        </View>
                        <Text style={styles.subQuantity}>Phương thức thanh toán</Text>

                        <View style={styles.paymentMethod}>
                            <TouchableOpacity
                                style={[styles.method, { backgroundColor: paymentMethod === "cash" ? Colors.ShoppeOrange : "#fff" }]}
                                onPress={() => setPaymentMethod("cash")}
                            >
                                <Text style={{ color: paymentMethod === "cash" ? "#fff" : "#000", }}>Tiền mặt</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.method, { backgroundColor: paymentMethod === "momo" ? Colors.ShoppeOrange : "#fff", }]}
                                onPress={() => setPaymentMethod("momo")}
                            >
                                <Text style={{ color: paymentMethod === "momo" ? "#fff" : "#000", }} >Momo</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.orderButton} onPress={checkout}>
                            <Text style={{ fontSize: 18, color: '#fff', fontWeight: '600' }}>Đặt món</Text>
                        </TouchableOpacity>
                    </View>
                }

                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    handleComponent={() => (
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#ddd',
                            padding: 10,
                            backgroundColor: '#f9f9f9',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }}>

                            <Text style={{ fontSize: 18, fontWeight: '400', }}>
                                Cập nhật món
                            </Text>
                            <TouchableOpacity onPress={() => bottomSheetRef.current.close()}>
                                <Icon source='close' size={28} color="gray" />
                            </TouchableOpacity>


                        </View>
                    )}
                >

                    <BottomSheetView>
                        {selectedItem &&
                            <View style={{ position: 'relative', height: '100%', }}>
                                <View style={styles.updateItem}>
                                    <Image source={{ uri: selectedItem.food.image }} style={styles.image} />
                                    <View style={{ marginLeft: 10, }}>
                                        <Text style={{ fontSize: 18 }}>{selectedItem.food.name}</Text>
                                        <Text style={{ fontSize: 15 }}>{selectedItem.food.description}</Text>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.ShoppeOrange }}>
                                            <PriceFormatter price={priceBS} />
                                        </Text>

                                    </View>
                                    <View style={styles.counterContainer}>
                                        <TouchableOpacity style={styles.addButton}
                                            onPress={() => {
                                                setQuantity(prev => prev > 1 ? prev - 1 : 1)
                                                setCount(prev => quantity > 1 ? prev - 1 : prev)
                                                setPriceBS(prev => prev > selectedItem.food.price ? prev - selectedItem.food.price : selectedItem.food.price)
                                            }}
                                        >
                                            <Text style={styles.addText}>-</Text>
                                        </TouchableOpacity>

                                        <Text style={styles.quantityText}>{quantity}</Text>

                                        <TouchableOpacity style={styles.addButton}
                                            onPress={() => {
                                                setQuantity(prev => prev + 1)
                                                setCount(prev => prev + 1)
                                                setPriceBS(prev => prev += selectedItem.food.price)
                                            }}
                                        >
                                            <Text style={styles.addText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity style={[styles.updateButton, { backgroundColor: isDisabled ? '#ccc' : Colors.ShoppeOrange },]}
                                    onPress={() => handleUpdateDish(selectedItem.id)}
                                    disabled={isDisabled}
                                >
                                    <Text style={{ fontSize: 18, color: '#fff', fontWeight: '600' }}>Cập nhật món</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </BottomSheetView>

                </BottomSheet>
            </View>
        </GestureHandlerRootView >
    )
}

export default PlaceOrderScreen

const styles = StyleSheet.create({
    loading: {

        position: 'absolute',
        zIndex: 10,
        top: 300,
        left: 180,
    },
    counterContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        position: 'absolute',
        bottom: 5,
        right: 10
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
    quantityText: {
        fontSize: 20,
        marginHorizontal: 15,

        paddingHorizontal: 10,
        borderRadius: 5
    },
    updateItem: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        marginTop: 10,
        position: 'relative'
    },
    orderButton: {
        width: '100%',
        height: 60,
        borderRadius: 8,
        backgroundColor: Colors.ShoppeOrange,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 5,
    },
    updateButton: {
        width: '93%',
        height: 60,
        borderRadius: 8,
        // backgroundColor: Colors.ShoppeOrange,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 5,
        position: 'absolute',
        bottom: 10
    },
    method: {
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginRight: 10
    },
    text: {
        fontSize: 17,
    },
    bottomHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        marginVertical: 10

    },
    paymentMethod: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    image: {
        width: 85,
        height: 85,
        borderRadius: 6
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
    subQuantity: {
        fontSize: 16,

    },
    subPrice: {
        fontSize: 18,
        fontWeight: '600',
        position: 'absolute',
        right: 20,
        bottom: 15
    },
    myAddress: {
        width: '100%',
        height: 150,
        backgroundColor: '#fff',
        elevation: 2,
        marginBottom: 1,
    },
    paymentInfo: {
        width: '100%',
        height: 500,
        backgroundColor: '#fff',
        marginTop: 1,
        paddingHorizontal: 15
    },
    bottomContainer: {
        height: 200,
        width: '100%',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 15
    },

})