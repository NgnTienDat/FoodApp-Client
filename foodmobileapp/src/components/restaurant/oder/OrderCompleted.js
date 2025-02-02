// import { View, Text } from "react-native";
import { View, Text, TouchableOpacity, FlatList, Modal, ScrollView, Alert } from "react-native";
import RestaurantStyles from "../../../styles/RestaurantStyles";
import { useState, useEffect, useCallback } from "react";
import RestaurantAPIs, { endpoints } from "../../../config/RestaurantAPIs";
import { useFocusEffect } from '@react-navigation/native';
import OrderList from "./OrderList";
import { useContext } from "react";
import { MyUserContext } from "../../../config/UserContexts";

const OrderCompleted = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const user = useContext(MyUserContext)
    const restaurantId = user.restaurant_id

    const loadOrder = async () => {
        setLoading(true);
        try {
            let res = await RestaurantAPIs.get(endpoints['getRestaurantOrder'](restaurantId));
            // console.info(res.data);
            const filterOrders = res.data.filter(o => o.delivery_status === "Hủy" || o.delivery_status === "Đang giao hàng" || o.delivery_status === "Đã giao")
            setOrders(filterOrders);
        } catch (ex) {
            console.error('Loi tai don hang:', ex);
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
                <View>

                    <OrderList
                        orders={orders}
                        onSelectOrder={(order) => { setSelectedOrder(order); setModalVisible(true); }}
                    />
                </View>
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
                            <View style={{ display: selectedOrder.delivery_status === 'Hủy' ? 'none' : 'flex' }}>
                                <Text style={RestaurantStyles.itemText}>Phí vận chuyển: {new Intl.NumberFormat('vi-VN').format(selectedOrder.shipping_fee)} đ</Text>
                                <Text style={RestaurantStyles.itemText}>Tổng thu: {new Intl.NumberFormat('vi-VN').format(selectedOrder.shipping_fee + selectedOrder.total)} đ</Text>
                            </View>
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
}
export default OrderCompleted;