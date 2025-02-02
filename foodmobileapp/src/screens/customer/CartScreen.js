import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native"
import { useContext, useEffect, useLayoutEffect, useState } from "react"
import { ActivityIndicator, Button, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { MyUserContext } from "../../config/UserContexts"
import APIs, { authApis, endpoints } from "../../config/APIs"
import { Checkbox, Icon } from "react-native-paper"
import PriceFormatter from "../../components/customer/FormatPrice"
import Colors from "../../config/Colors"
import { CartContext } from "../../config/CartContext"


const CartScreen = () => {
    const route = useRoute();
    const { cartId } = route.params  
    const [message, setMessage] = useState('')
    const [subCarts, setSubCarts] = useState([])
    const user = useContext(MyUserContext)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [isEditing, setIsEditing] = useState(false)
    const [checkedItems, setCheckedItems] = useState([]) // Lưu các giá trị true/false đại diện cho sub cart đc chọn
    const anyItemChecked = checkedItems.some(item => item)
    const [selectedSubCarts, setSelectedSubCarts] = useState([]) // Lưu Id của sub cart
    const [count, setCount] = useState(0)
    const isFocused = useIsFocused()

    const nav = useNavigation()

    const toggleEdit = () => {
        console.log('is edit: ', isEditing)
        setIsEditing(!isEditing)
        setCheckedItems(subCarts.map(() => false))
        setSelectedSubCarts([])
        setCount(0)


    };

    useLayoutEffect(() => {
        nav.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={toggleEdit}>
                    <Text style={styles.edit}>
                        {isEditing === false ? 'Sửa' : 'Hủy'}
                    </Text>
                </TouchableOpacity>
            )
        })  
    })

    const getMySubCarts = async () => {
        try {
            
            if (page > 0) {
                const authTokenApi = await authApis()
                let url = `${endpoints['sub-carts']}?page=${page}`
                setLoading(true)
                let mySubCarts = await authTokenApi.get(url)

                
                if (page > 1)
                    setSubCarts(current_subCarts => [...current_subCarts, ...mySubCarts.data.results])

                else
                    setSubCarts(mySubCarts.data.results)

                if (mySubCarts.data.next === null) setPage(0);

                setMessage('')

                console.info('MY SUB CARTS: ', mySubCarts.data.results)
            }

        } catch (err) {
            if (err.response && err.response.status === 404) {
                setMessage('Giỏ hàng của bạn hiện đang trống!');
                setSubCarts([])
            }
        } finally {
            setLoading(false)
        }
    }


    const loadMore = () => {
        if (page > 0 && !loading)
            setPage(page + 1);
    }

    const handleCheckedItems = (index, itemID) => {
        const newCheckedItems = [...checkedItems]
        newCheckedItems[index] = !newCheckedItems[index]

        setSelectedSubCarts((prev) => {
            if (prev.includes(itemID)) {
                setCount(count - 1)
                return prev.filter((item) => item !== itemID)
            }
            else {
                setCount(count + 1)
                return [...prev, itemID]
            }
        })

        console.info('selected Sub carts: ', selectedSubCarts)
        setCheckedItems(newCheckedItems)
    }


    const handleSelectAll = () => {
        const allChecked = checkedItems.every((item) => item === true);

        if (allChecked) {
            // Nếu tất cả đã được chọn -> Bỏ chọn tất cả
            setCheckedItems(subCarts.map(() => false));
            setSelectedSubCarts([]);
            setCount(0);
        } else {
            // Nếu chưa chọn hết -> Chọn tất cả
            const allSubCartIDs = subCarts.map((subCart) => subCart.id); // Lấy tất cả ID
            setCheckedItems(subCarts.map(() => true));
            setSelectedSubCarts(allSubCartIDs);
            setCount(subCarts.length);
        }
    };


    const handleDeleteSubCart = async () => {

        try {
            setLoading(true)

            const data = {
                cartId: cartId,
                itemsNumber: count,
                ids: selectedSubCarts,
            };

            console.info("Response:", data)


            let res = await APIs.post(endpoints['delete-sub-carts'], data)

            if (res.status === 200) {
                console.info("SubCart deleted successfully!");
            } else {
                console.error("API trả về lỗi:", res.data);
            }


            setSubCarts((prev) => prev.filter((subCart) => !selectedSubCarts.includes(subCart.id)));

            setSelectedSubCarts([])
            setIsEditing(!isEditing)
            setCheckedItems([])
            setCount((prevCount) => prevCount - selectedSubCarts.length)

            if (subCarts.length - selectedSubCarts.length === 0) {
                setMessage("Giỏ hàng của bạn hiện đang trống!");
            }

   


        } catch (err) {
            console.info(err)
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        getMySubCarts()

    }, [page])

    return (

        <View style={{ flex: 1}}>
            {loading && <ActivityIndicator size="large" color="#EE4D2D" style={{ marginTop: 10 }} />}
            {message ? (
                <View style={styles.messageContainer}>
                    <Text style={styles.message}>
                        {message}
                    </Text>
                    <TouchableOpacity style={styles.buttonExplore} onPress={() => nav.goBack()}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>Khám phá ngay</Text>
                    </TouchableOpacity>
                </View>
            ) : ( 


                <View style={{flex: 1, position: 'relative'}}>
                    <FlatList
                        refreshing={loading}
                        contentContainerStyle={{ marginTop: 3,  }}
                        data={subCarts}
                        onEndReached={loadMore}

                        renderItem={({ item, index }) => (
                            <View style={{ flexDirection: 'row', }}>
                                <TouchableOpacity style={[styles.subCart, { width: isEditing ? '85%' : '100%' }]}
                                    onPress={() => nav.navigate('PlaceOrderScreen', {"restaurant": item.restaurant})}
                                >
                                    <Image source={{ uri: item.restaurant.image }} style={styles.restaurantImage} />
                                    <View style={styles.subCartInfo}>
                                        <Text style={styles.subCartName}>{item.restaurant.name}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                            <Icon source="map-marker-outline" size={15} />
                                            <Text style={styles.distance}> 1.8 km</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.subCartTotal}><PriceFormatter price={item.total_price} /></Text>
                                            <Text style={{ fontSize: 16, fontWeight: '400' }}>  ({item.total_quantity} Phần)</Text>
                                        </View>


                                    </View>
                                </TouchableOpacity>
                                {isEditing &&
                                    <View style={styles.checkboxContainer}>
                                        <Checkbox
                                            status={checkedItems[index] ? 'checked' : 'unchecked'}
                                            onPress={() => handleCheckedItems(index, item.id)} />
                                    </View>
                                }
                            </View>
                        )}

                    />
                    {isEditing &&
                        <View style={styles.deleteContainer}>
                            <TouchableOpacity style={styles.button}
                                onPress={handleSelectAll}
                            >
                                <Text style={styles.buttonText}>
                                    {checkedItems.every((item) => item === true) ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.deleteButton, !anyItemChecked && styles.disabledButton]}
                                disabled={!anyItemChecked}
                                onPress={handleDeleteSubCart}
                            >
                                <Text style={[styles.buttonText, { color: '#fff' }]}>Xóa({count})</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            )}

        </View>

    )
}
export default CartScreen

const styles = StyleSheet.create({
    checkboxContainer: {
        backgroundColor: '#fff',
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        elevation: 2,
        borderColor: '#ccc',

    },
    disabledButton: {
        backgroundColor: '#ddd7d7e3',
    },
    deleteContainer: {
        flexDirection: 'row',
        paddingVertical: 20,
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
        width: '100%'
    },
    edit: {
        fontSize: 17, fontWeight: '400', paddingHorizontal: 5, color: '#0088ff'
    },
    messageContainer: {
        justifyContent: 'center', alignItems: 'center', height: '100%',
    },
    message: {
        fontSize: 18
    },
    buttonExplore: {
        padding: 10,
        backgroundColor: Colors.ShoppeOrange,
        marginTop: 10,
        borderRadius: 8
    },
    button: {
        // backgroundColor: '#fff',    
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 5,


    },
    deleteButton: {
        backgroundColor: Colors.ShoppeOrange,
        paddingHorizontal: 30

    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
    restaurantImage: {
        width: 100,
        height: 100,
        borderRadius: 10
    },
    subCart: {
        backgroundColor: '#fff',
        padding: 10,
        elevation: 3,
        flexDirection: 'row',
        width: '85%'
    },
    subCartInfo: {
        paddingHorizontal: 10,
        paddingTop: 10
    },
    subCartName: {
        fontSize: 18,
        fontWeight: '500'
    },
    subCartTotal: {
        fontSize: 18,
        fontWeight: '600'
    },
    distance: {
        fontSize: 14,

    }

})

// const deleteSubCarts = selectedSubCarts.map(subCart => `sub-cart-id=${encodeURIComponent(subCart)}`).join('&')
// let url = `${endpoints['delete-sub-carts']}?${deleteSubCarts}`
// console.info("URL", url);