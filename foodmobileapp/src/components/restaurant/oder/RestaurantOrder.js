import { View, Text, TouchableOpacity, Modal, ScrollView, Alert } from "react-native";
import RestaurantStyles from "../../../styles/RestaurantStyles";
import { useState, useEffect, useCallback } from "react";
import RestaurantAPIs, { endpoints } from "../../../config/RestaurantAPIs";
import { useFocusEffect } from '@react-navigation/native';
import OrderList from "./OrderList";

const RestaurantOrder = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const loadOrder = async () => {
        setLoading(true);
        try {
            let res = await RestaurantAPIs.get(endpoints['getOrder']);
            // console.info(res.data);
            const filterOrders = res.data.filter(o => o.delivery_status === "Chờ xác nhận")
            setOrders(filterOrders);
        } catch (ex) {
            console.error('Loi tai don hang:', ex);
        } finally {
            setLoading(false);
        }
    };

    const confirmOrder = async (orderId) => {
        setLoading(true);
        try {
            const form = new FormData();
            form.append('delivery_status', "Đã xác nhận");

            console.info("Form data:", Array.from(form.entries()));

            let res = await RestaurantAPIs.patch(endpoints['statusOrder'](orderId), form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(res.data);
            loadOrder();
        } catch (ex) {
            console.error('Lỗi nhận đơn hàng:', ex);
        } finally {
            setLoading(false);
        }
    }

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
                <OrderList
                    orders={orders}
                    onSelectOrder={(order) => { setSelectedOrder(order); setModalVisible(true); }}
                    onCancel={cancelOrder}
                    onConfirm={confirmOrder}
                />
            )}

            {selectedOrder && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={RestaurantStyles.modalContainer}>
                        <View style={RestaurantStyles.orderDetailContainer}>
                            <View style={RestaurantStyles.topOrderContainer}>
                                <Text style={RestaurantStyles.customerName}>{selectedOrder.user_name}</Text>
                                <Text style={RestaurantStyles.orderIdStyle}>Mã đơn: {selectedOrder.id}</Text>
                            </View>

                            <Text style={RestaurantStyles.orderText}>Số món: {selectedOrder.order_details.length}</Text>
                            <ScrollView style={{ height: 300 }}>
                                {selectedOrder.order_details.map((item, index) => (
                                    <View key={`item-${index}`}>
                                        <Text style={RestaurantStyles.itemText}>Tên món: {item.food_name}</Text>
                                        <Text style={RestaurantStyles.infoText}>Giá tiền: {new Intl.NumberFormat('vi-VN').format(item.sub_total)} đ</Text>
                                        <Text style={RestaurantStyles.infoText}>Số lượng: {item.quantity}</Text>
                                    </View>
                                ))}
                            </ScrollView>
                            <Text style={RestaurantStyles.itemText}>Giá trị đơn hàng: {new Intl.NumberFormat('vi-VN').format(selectedOrder.total)} đ</Text>
                            <View style={RestaurantStyles.footer}>
                                <TouchableOpacity
                                    style={RestaurantStyles.rejectBtn}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={RestaurantStyles.btnText}>Thoát</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default RestaurantOrder;
