import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Button } from "react-native-paper";
import RestaurantStyles from "../../../styles/RestaurantStyles";

const OrderList = ({ orders, onSelectOrder, onCancel, onConfirm }) => {

    return (
        <FlatList
            data={orders}
            keyExtractor={(item, index) => `order-${index}`}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => { onSelectOrder(item) }}>
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

                        <View style={{ flexDirection: 'row', display: item.delivery_status === "Đã giao" || item.delivery_status === "Hủy" ? 'none' : 'flex' }}>
                            <Button
                                mode="contained"
                                style={[RestaurantStyles.receiveOrderBtn, { backgroundColor: '#ccc' }]}
                                onPress={() => onCancel(item.id)}
                            >
                                {item.delivery_status === "Đã xác nhận" ? "Hủy đơn" : " Từ chối"}
                            </Button>
                            <Button
                                mode="contained"
                                style={RestaurantStyles.receiveOrderBtn}
                                onPress={() => onConfirm(item.id)}
                            >
                                {item.delivery_status === "Đã xác nhận" ? "Giao hàng" : "Nhận đơn hàng"}
                            </Button>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

export default OrderList;