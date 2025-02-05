import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Alert } from 'react-native';
import RestaurantStyles from "../../../styles/RestaurantStyles";
import RestaurantAPIs, { endpoints } from "../../../config/RestaurantAPIs";
import { Button } from 'react-native-paper';

const OrderDetail = ({ navigation, route }) => {
    const orderId = route.params?.orderId;
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState([]);


    const loadOrderDetail = async () => {
        setLoading(true);
        try {
            let res = await RestaurantAPIs.get(endpoints['statusOrder'](orderId));
            console.info('ORDERS: ',res.data);
            setOrder(res.data)
        } catch (ex) {
            console.error('Loi tai don hang:', ex);
        } finally {
            setLoading(false);
        }
    };

    const cancelOrder = async () => {
        setLoading(true)
        try {

            const handleCancelOrder = async () => {
                const form = new FormData();
                form.append('delivery_status', "Hủy");
                let res = await RestaurantAPIs.patch(endpoints['statusOrder'](orderId), form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(res.data);
                Alert.alert(
                    "Thành công",
                    "Đơn hàng đã được hủy!",
                    [{ text: "OK", onPress: () => navigation.goBack() }]
                );
            };
            Alert.alert(
                "Xác nhận",
                "Bạn có chắc chắn muốn hủy đơn hàng này không?",
                [
                    {
                        text: "Hủy",
                        onPress: () => console.log("Người dùng đã hủy thao tác"),
                        style: "cancel",
                    },
                    {
                        text: "Tiếp tục",
                        onPress: handleCancelOrder,
                    },
                ],
                { cancelable: false }
            );
        }
        catch (ex) {
            console.error('Lỗi từ chối đơn hàng:', ex);
        } finally {
            setLoading(false);
        }
    }

    const confirmOrder = async () => {
        setLoading(true);
        try {
            const form = new FormData();
            form.append('delivery_status', "Đã giao");
            await RestaurantAPIs.patch(endpoints['statusOrder'](orderId), form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            Alert.alert(
                "Thành công",
                "Đơn hàng đã được xác nhận giao hàng!",
                [{ text: "OK", onPress: () => navigation.goBack() }]
            );
        } catch (ex) {
            console.error('Lỗi xác nhận đơn hàng:', ex);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrderDetail();
    }, [orderId]);


    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={RestaurantStyles.headerOrder}>
                    <View style={{ marginBottom: 10, }}>
                        <Text style={RestaurantStyles.headerOrderText} >Thông tin khách hàng</Text>
                    </View>
                    <View style={RestaurantStyles.topOrderContainer}>
                        <Text style={{ fontSize: 17 }}>Tên khách hàng</Text>
                        <Text style={{ fontSize: 17 }}>{order.user_name}</Text>
                    </View>
                    <View style={RestaurantStyles.topOrderContainer}>
                        <Text style={{ fontSize: 17 }}>Địa chỉ</Text>
                        <Text style={{ fontSize: 17 }}>{order.shipping_address ? order.shipping_address : 'No address'}</Text>
                    </View>
                    <Button
                        icon="chat-outline"
                        mode="contained"
                        labelStyle={{ color: 'black' }}
                        style={[RestaurantStyles.receiveOrderBtn, { backgroundColor: '#ccc' }]}
                        onPress={() => navigation.navigate('chat_room', {
                            userId: order.user,
                        })}>
                        Nhắn tin khách hàng
                    </Button>
                </View>

                <View style={RestaurantStyles.headerOrder}>
                    <View style={{ marginBottom: 10, }}>
                        <Text style={RestaurantStyles.headerOrderText} >Chi tiết món ăn</Text>
                    </View>
                    <View style={{ margin: 15, }} >
                        {order.order_details ? (
                            order.order_details.map((item, index) => (
                                <View key={`item-${index}`}>
                                    <Text style={RestaurantStyles.itemText}>Tên món: {item.food.name}</Text>
                                    <Text style={RestaurantStyles.infoText}>Giá tiền: {new Intl.NumberFormat('vi-VN').format(item.sub_total)} đ</Text>
                                    <Text style={RestaurantStyles.infoText}>Số lượng: {item.quantity}</Text>
                                </View>
                            ))
                        ) : (
                            <Text>Không có chi tiết đơn hàng</Text>
                        )}
                    </View>

                </View>

                <View style={RestaurantStyles.headerOrder}>
                    <View style={{ marginBottom: 10, }}>
                        <Text style={RestaurantStyles.headerOrderText} >Chi tiết thanh toán</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 17, marginBottom: 5 }}>Hình thức thanh toán: Tiền mặt</Text>
                        <Text style={RestaurantStyles.itemText}>Tiền hàng: {new Intl.NumberFormat('vi-VN').format(order.total - order.shipping_fee)} đ</Text>
                        <Text style={RestaurantStyles.itemText}>Phí vận chuyển: {new Intl.NumberFormat('vi-VN').format(order.shipping_fee)} đ</Text>
                        <Text style={RestaurantStyles.itemText}>Tổng thanh toán: {new Intl.NumberFormat('vi-VN').format(order.total)} đ</Text>
                    </View>


                </View>
            </ScrollView>
            <View >
                <Button
                    mode="contained"
                    style={RestaurantStyles.receiveOrderBtn}
                    // onPress={() => console.log('Giao hàng')}
                    onPress={() => confirmOrder()}
                >
                    Giao hàng
                </Button>
                <Button
                    mode="contained"
                    style={[RestaurantStyles.receiveOrderBtn, { backgroundColor: '#ccc' }]}
                    // onPress={() => console.log('Từ chối')}
                    onPress={() => cancelOrder()}
                >
                    Hủy đơn
                </Button>
            </View>
        </View>
    );
}
export default OrderDetail;