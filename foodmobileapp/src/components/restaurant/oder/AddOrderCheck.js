import { ref, push, set, onChildAdded } from 'firebase/database';
import { database } from "../../../config/FirebaseConfig";
import { View, Button, Text, Alert } from "react-native";
import { useEffect, useState } from 'react';
import RestaurantAPIs, { endpoints } from '../../../config/RestaurantAPIs';

const AddOrderCheck = () => {
    const [newOrder, setNewOrder] = useState(null);

    const order = {
        user: 7,
        restaurant: 5,
        delivery_status: 'Chờ xác nhận',
    };

    const addOrderToDatabase = async () => {
        try {
            // Lưu vào Firebase
            const ordersRef = ref(database, 'orders');
            const newOrderRef = push(ordersRef);
            await set(newOrderRef, order);
            console.log('Thêm đơn hàng vào Firebase thành công!');

            // Lưu vào CSDL backend
            const response = await RestaurantAPIs.post(endpoints["addOrder"], order);
            console.log('Thêm đơn hàng vào CSDL backend thành công:', response.data);
        } catch (error) {
            console.error('Lỗi khi thêm đơn hàng:', error);
        }
    };

    useEffect(() => {
        // Lắng nghe các đơn hàng mới
        const ordersRef = ref(database, 'orders');
        const unsubscribe = onChildAdded(ordersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setNewOrder(data);
                Alert.alert("Thông báo", "Có đơn hàng mới!");
            }
        });

        return () => unsubscribe(); // Hủy lắng nghe khi component bị unmount
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ margin: 10 }}>
                <Button title="Thêm đơn hàng" onPress={addOrderToDatabase} />
            </View>
            <View style={{ margin: 10 }}>
                {newOrder && (
                    <Text>
                        Đơn hàng mới từ user ID: {newOrder.user}, trạng thái: {newOrder.delivery_status}
                    </Text>
                )}
            </View>
        </View>
    );
};

export default AddOrderCheck;
