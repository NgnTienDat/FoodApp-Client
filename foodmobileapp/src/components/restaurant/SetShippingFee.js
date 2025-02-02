import React, { useState, useEffect, useContext } from "react";
import { Text, View, TextInput, Alert, TouchableOpacity } from "react-native";
import { MyUserContext } from "../../config/UserContexts";
import RestaurantAPIs, { endpoints } from "../../config/RestaurantAPIs";

const SetShippingFee = () => {
    const [feePerKm, setFeePerKm] = useState('');
    const user = useContext(MyUserContext);
    const restaurantId = user.restaurant_id;

    const loadRestaurant = async () => {
        try {
            console.info(user.id);
            const res = await RestaurantAPIs.get(endpoints['restaurant'](restaurantId));
            setFeePerKm(res.data.shipping_fee || '');  // Set giá trị vận chuyển nếu có
            console.info(res.data.shipping_fee)
        } catch (ex) {
            console.error(ex);
        }
    };

    useEffect(() => {
        if (restaurantId) {
            loadRestaurant();  // Gọi loadRestaurant mỗi khi restaurantId thay đổi
        }
    }, [restaurantId]);

    const handleSave = async () => {
        if (feePerKm) {
            const form = new FormData();
            form.append('shipping_fee', feePerKm);
            try {
                const response = await RestaurantAPIs.patch(`${endpoints['restaurant'](restaurantId)}`, form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.status === 201) {
                    console.log(response.data);
                }
                Alert.alert("Thông báo", `Đã lưu giá trị: ${feePerKm} VNĐ/1km`);
            } catch (ex) {
                console.error(ex);
            }
        } else {
            Alert.alert("Lỗi", "Vui lòng nhập số tiền vận chuyển!");
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
                Nhập số tiền vận chuyển mỗi km (VNĐ)
            </Text>
            <TextInput
                style={{
                    height: 45,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginBottom: 20,
                    paddingLeft: 10,
                }}
                keyboardType="numeric"
                value={feePerKm ? feePerKm.toString() : ""}
                onChangeText={(text) => setFeePerKm(text)}
            />
            <TouchableOpacity
                style={{
                    backgroundColor: '#EE4D2D',
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 5,
                    alignItems: 'center',
                }}
                onPress={handleSave}
            >
                <Text style={{ color: '#fff', fontSize: 18 }}>Lưu</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SetShippingFee;
