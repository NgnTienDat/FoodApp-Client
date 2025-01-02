import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import RestaurantStyles from "../../styles/RestaurantStyles";
import RestaurantAPIs, { endpoints } from "../../config/RestaurantAPIs";


const AddCategory = ({ route, navigation }) => {
    const [category, setCategory] = useState("")
    const { onGoBack } = route.params || {};
    const [loading, setLoading] = useState(false);
    const restaurantId = 1

    const addCategory = async () => {
        setLoading(true);
        try {
            const form = new FormData();
            form.append('name', category)

            const response = await RestaurantAPIs.post(`${endpoints['createCategory'](restaurantId)}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 201) {
                console.log(response.data);
                setCategory('');
                Alert.alert('Thành công', 'Danh mục mới đã được thêm!');
            }
            // Gọi callback khi quay về
            if (onGoBack) onGoBack();
            navigation.goBack();

        }
        catch (ex) {
            if (ex.response) {
                console.error('Server trả về lỗi:', ex.response.data);
                Alert.alert('Lỗi', ex.response.data.message || 'Không thể thêm danh mục.');
            } else {
                console.error('Lỗi không xác định:', ex.message);
                Alert.alert('Lỗi', 'Không thể thêm danh mục. Vui lòng thử lại.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View>
                <Text style={{ marginTop: 5, fontSize: 17, fontWeight: 'bold' }}> Tên danh mục mới: </Text>
                <TextInput style={RestaurantStyles.inputMargin}
                    label=" Món nước, Cơm, Bánh ngọt ..."
                    mode="outlined"
                    value={category}
                    onChangeText={text => setCategory(text)}
                />
            </View>

            <Button icon="plus" mode="contained" style={[RestaurantStyles.addBtn]}
                onPress={addCategory}
                loading={loading}
                disabled={loading}
            >
                Thêm
            </Button>
        </View>
    );
};
export default AddCategory