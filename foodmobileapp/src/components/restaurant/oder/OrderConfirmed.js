import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Modal, TouchableOpacity, Alert, FlatList } from 'react-native';
import RestaurantAPIs, { endpoints } from "../../../config/RestaurantAPIs";
import { useFocusEffect } from '@react-navigation/native';
import RestaurantStyles from "../../../styles/RestaurantStyles";


const OrderConfirmed = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);


    const loadOrder = async () => {
        setLoading(true);
        try {
            let res = await RestaurantAPIs.get(endpoints['getOrder']);
            // console.info(res.data);
            const filterOrders = res.data.filter(o => o.delivery_status === "Đã xác nhận")
            setOrders(filterOrders);
        } catch (ex) {
            console.error('Loi tai don hang:', ex);
        } finally {
            setLoading(false);
        }
    };

    const cancelOrder = async (orderId) => {
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
                loadOrder();
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

    const confirmOrder = async (orderId) => {
        setLoading(true);
        try {
            const form = new FormData();
            form.append('delivery_status', "Đã giao");
            await RestaurantAPIs.patch(endpoints['statusOrder'](orderId), form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            loadOrder();
        } catch (ex) {
            console.error('Lỗi xác nhận đơn hàng:', ex);
        } finally {
            setLoading(false);
        }
    };


    useFocusEffect(
        useCallback(() => {
            loadOrder();
        }, [])
    );

    return (
        <View>
            {loading ? (
                <Text></Text>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item, index) => `order-${index}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('order_detail', {
                            orderId: item.id,
                        })}>
                            <View style={RestaurantStyles.orderContainer}>
                                <View style={RestaurantStyles.topOrderContainer}>
                                    <Text style={[RestaurantStyles.orderText, { fontWeight: 'bold' }]}>{item.user_name}</Text>
                                    <Text style={RestaurantStyles.statusText}>{item.delivery_status}</Text>
                                </View>

                                <View style={RestaurantStyles.orderInfoContainer}>
                                    <Text style={RestaurantStyles.infoText}>Mã đơn: {item.id} (Chưa thanh toán)</Text>
                                    <Text style={RestaurantStyles.infoText}>Số món: {item.order_details.length}</Text>
                                    <Text style={RestaurantStyles.infoText}>Địa chỉ: {item.shipping_address ? item.shipping_address : 'ABC, 123, Quận 1, HCM'}</Text>
                                </View>

                                {/* <View style={{ flexDirection: 'row' }}>
                                    <Button
                                        mode="contained"
                                        style={[RestaurantStyles.receiveOrderBtn, { backgroundColor: '#ccc' }]}
                                        onPress={() => cancelOrder(item.id)}
                                    >
                                        Hủy đơn
                                    </Button>
                                    <Button
                                        mode="contained"
                                        style={RestaurantStyles.receiveOrderBtn}
                                        onPress={() => confirmOrder(item.id)}
                                    >
                                        Giao hàng
                                    </Button>
                                </View> */}
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}
export default OrderConfirmed;
