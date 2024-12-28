import React, { useState, useEffect } from "react";
import { View, Text, Alert, ActivityIndicator } from "react-native";
import RestaurantAPIs, { endpoints } from "../../config/RestaurantAPIs";
import { TextInput, Button } from 'react-native-paper';
import RestaurantStyles from "../../styles/RestaurantStyles";

const DetailCategory = ({ route, navigation }) => {
    const categoryId = route.params?.categoryId;
    const { onGoBack } = route.params || {};
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState([])
    const [text, setText] = useState("")

    const loadCategory = async () => {
        setLoading(true)
        try {
            let url = `${endpoints['detailCategory'](categoryId)}`
            let res = await RestaurantAPIs.get(url)

            console.log(res.data.name)
            setCategory(res.data)
            setText(res.data.name)
        }
        catch (ex) {
            console.error('lỗi' + ex);
        } finally {
            setLoading(false);
        }
    }

    const updateCategory = async () => {
        setLoading(true);
        try {
            const form = new FormData();
            form.append('name', text)

            const response = await RestaurantAPIs.put(`${endpoints['detailCategory'](categoryId)}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                console.log(response.data);
                setCategory('');
                Alert.alert('Thành công', 'Danh mục đã được cập nhật!');
            }
            // Gọi callback khi quay về
            if (onGoBack) onGoBack();
            navigation.goBack();

        } catch (ex) {
            if (ex.response) {
                console.error('Server trả về lỗi:', ex.response.data);
                Alert.alert('Lỗi', ex.response.data.message || 'Không thể cập nhật danh mục.');
            } else {
                console.error('Lỗi không xác định:', ex.message);
                Alert.alert('Lỗi', 'Không thể cập nhật danh mục. Vui lòng thử lại.');
            }

        } finally {
            setLoading(false);
        }
    }
    const deleteCategory = async () => {
        setLoading(true);
        try {
            const form = new FormData();
            form.append('name', text)

            const response = await RestaurantAPIs.delete(`${endpoints['detailCategory'](categoryId)}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 204) {
                console.log(response.data);
                setCategory('');
                Alert.alert('Thành công', 'Danh mục đã được xóa!');
            }
            // Gọi callback khi quay về
            if (onGoBack) onGoBack();
            navigation.goBack();

        } catch (ex) {
            if (ex.response) {
                console.error('Server trả về lỗi:', ex.response.data);
                Alert.alert('Lỗi', ex.response.data.message || 'Không thể xóa danh mục.');
            } else {
                console.error('Lỗi không xác định:', ex.message);
                Alert.alert('Lỗi', 'Không thể xóa danh mục. Vui lòng thử lại.');
            }
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        loadCategory();
    }, [categoryId]);

    return (
        <View style={{ flex: 1 }}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <View>
                        <Text style={{ marginTop: 5, fontSize: 17, fontWeight: 'bold' }}>Tên danh mục:</Text>
                        <TextInput style={RestaurantStyles.inputMargin}
                            mode="outlined"
                            value={text}
                            onChangeText={(value) => setText(value)}
                        />
                    </View>
                    <View style={[RestaurantStyles.groupBtn]}>
                        <Button icon="content-save-outline" mode="contained" style={[RestaurantStyles.addBtn]} onPress={updateCategory}>
                            Lưu
                        </Button>
                        <Button icon="delete-outline" mode="contained" style={[RestaurantStyles.deleteBtn]} onPress={deleteCategory}>
                            Xóa
                        </Button>
                    </View>
                </>
            )}

        </View>
    );
};
export default DetailCategory