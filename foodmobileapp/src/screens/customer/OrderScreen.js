import { ActivityIndicator, Button, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import TopTab from "../../components/customer/TopTab"
import { useContext, useEffect, useState } from "react"
import { LoadOrders } from "../../api/HookCustomer"
import PriceFormatter from "../../components/customer/FormatPrice"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import Colors from "../../config/Colors"
import { MyUserContext } from "../../config/UserContexts"



const OrderTabs = ({ status }) => {
    const [orders, setOrders] = useState([]);
    const isFocused = useIsFocused()
    const [isLoading, setIsLoading] = useState(false)
    const nav = useNavigation()

    const user = useContext(MyUserContext)


    const fetchData = async () => {

        try {
            setIsLoading(true)
            const fetchedOrders = await LoadOrders(status)
            setOrders(fetchedOrders);
        } catch (error) {
            console.error('error: ', error)
        } finally {
            setIsLoading(false)
        }
    };


    const OrdersDetail = ({ item }) => (
        <View style={styles.subItemContainer}>
            <Image source={{ uri: item.food.image }} style={styles.image} />
            <View style={styles.subInfo}>
                <Text style={styles.subText}>{item.food.name}</Text>
                <Text style={styles.subQuantity}>Số lượng: {item.quantity}</Text>
            </View>
            <Text style={styles.subPrice}>
                <PriceFormatter price={item.food.price} />
            </Text>
            {status === 'Đã giao' && item.evaluated === false && (
                <TouchableOpacity style={styles.evaluation}
                    onPress={() => nav.navigate('EvaluationScreen', { "order": item })}
                >
                    <Text style={{ color: Colors.ShoppeOrange, fontSize: 17 }}>Đánh giá</Text>
                </TouchableOpacity>
            )}
        </View>
    )


    const Orders = ({ order }) => (
        <View style={styles.orderContainer}>
            <FlatList
                data={order.order_details}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <OrdersDetail item={item} />}
            />
            <Text style={styles.total}>
                Tổng số tiền ({order.order_details.length} sản phẩm):{' '}
                <PriceFormatter price={order.total} />
            </Text>
            <View style={{ justifyContent: 'flex-end' }}>
                <Text style={styles.status}>Trạng thái: {order.delivery_status}</Text>

            </View>
        </View>
    )
    useEffect(() => {
        
        if (!user) {
            nav.navigate('LoginScreen')
            return
        }

        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);
    return (
        <View>
            {isLoading &&
                <View style={styles.loading}>
                    <ActivityIndicator size={70} color={Colors.ShoppeOrange} />
                </View>
            }
            {orders && orders.length > 0 ? (

                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Orders order={item} />}
                />
            ) : (
                <View style={{backgroundColor: '#fff', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 16}}>Không có đơn hàng nào!</Text>
                </View>
            )}
        </View>
    );
};


const OrderScreen = () => {

    const tabsOrder = [
        { name: "Chờ xác nhận", component: () => <OrderTabs status="Chờ xác nhận" /> },
        { name: "Đã xác nhận", component: () => <OrderTabs status="Đã xác nhận" /> },
        { name: "Đang giao hàng", component: () => <OrderTabs status="Đang giao hàng" /> },
        { name: "Đã giao hàng", component: () => <OrderTabs status="Đã giao" /> },
        { name: "Đã hủy", component: () => <OrderTabs status="Đã hủy" /> },

    ];
    return (
        <View style={{ flex: 1 }}>

            <TopTab tabs={tabsOrder} />

        </View>

    )
}

export default OrderScreen

const styles = StyleSheet.create({
    evaluation: {
        padding: 5,
        borderWidth: 1,
        borderColor: Colors.ShoppeOrange,
        alignItems: 'center',
        width: 100,
        height: 37,
        borderRadius: 5,
        marginLeft: 'auto',
        marginBottom: 10,
        marginRight: 10,
        alignItems: 'center'

    },
    loading: {
        position: 'absolute',
        zIndex: 10,
        top: 300,
        left: 180,
    },
    orderContainer: {
        marginTop: 2,
        backgroundColor: '#fff'

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
    total: {
        fontSize: 17,
        fontWeight: '500',
        padding: 5,
        left: 10
    },
    status: {
        fontSize: 16,
        fontWeight: '400',
        padding: 5,
        left: 10
    },

})