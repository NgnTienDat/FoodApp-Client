import { View, Text, TouchableOpacity, Modal, ScrollView, Alert, ActivityIndicator } from "react-native";
import RestaurantStyles from "../../../styles/RestaurantStyles";
import { useState, useEffect, useCallback } from "react";
import RestaurantAPIs, { endpoints } from "../../../config/RestaurantAPIs";
import { useFocusEffect } from '@react-navigation/native';
import OrderList from "./OrderList";
import { useContext } from "react";
import { MyUserContext } from "../../../config/UserContexts";
//
import { ref, onChildAdded } from "firebase/database";
import { database } from "../../../config/FirebaseConfig";

const RestaurantOrder = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const user = useContext(MyUserContext)
    const restaurantId = user.restaurant_id

    const loadOrder = async () => {
        setLoading(true);
        try {
            let res = await RestaurantAPIs.get(endpoints['getRestaurantOrder'](restaurantId));
            console.info(res.data);
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


    useEffect(() => {
        const ordersRef = ref(database, `orders`);
        const unsubscribe = onChildAdded(ordersRef, (snapshot) => {
            const newOrder = snapshot.val();
            if (newOrder.restaurant === restaurantId) {
                loadOrder();
            }
        });

        return () => unsubscribe();
    }, [restaurantId]);

    useFocusEffect(
        useCallback(() => {
            loadOrder();
        }, [])
    );

    return (
        <View>
            <View>
                {loading && <ActivityIndicator />}
            </View>

            <OrderList
                orders={orders}
                onSelectOrder={(order) => { setSelectedOrder(order); setModalVisible(true); }}
                onCancel={cancelOrder}
                onConfirm={confirmOrder}
            />


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
                                        <Text style={RestaurantStyles.itemText}>Tên món: {item.food.name}</Text>
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
