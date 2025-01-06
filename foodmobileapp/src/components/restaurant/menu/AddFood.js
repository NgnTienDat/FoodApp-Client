import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import RestaurantStyles from "../../../styles/RestaurantStyles";
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import RestaurantAPIs, { endpoints } from "../../../config/RestaurantAPIs";


const AddFood = ({ route, navigation }) => {
    const restaurantId = 1
    const { onGoBack } = route.params || {};
    const [loading, setLoading] = useState(false);
    const [food, setFood] = useState({
        "name": "",
        "price": "",
        "description": ""
    })

    const updateFood = (value, field) => {
        setFood({ ...food, [field]: value });
    }

    const foods = {
        "name": {
            "title": "Tên món ăn",
            "field": "name",
            "secure": false,
            "icon": "text",
            "keyboardType": "default"
        },
        "price": {
            "title": "Giá tiền",
            "field": "price",
            "secure": false,
            "icon": "text",
            "keyboardType": "numeric"
        },
        "description": {
            "title": "Mô tả món ăn",
            "field": "description",
            "secure": false,
            "icon": "text",
            "keyboardType": "default"
        }
    }

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [categoriesItems, setCategoriesItems] = useState([]);

    const [openTime, setTimeOpen] = useState(false);
    const [valueTime, setTimeValue] = useState(null);
    const [timeItems, setTimeItems] = useState([
        { label: 'Sáng', value: 'Sáng' },
        { label: 'Trưa', value: 'Trưa' },
        { label: 'Chiều', value: 'Chiều' },
        { label: 'Tối', value: 'Tối' },
        { label: 'Cả ngày', value: 'Cả ngày' },
    ]);

    const [image, setImage] = useState(null)

    const pickImage = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Permissions denied!");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled)
                setImage(result.assets[0]);
        }
    }

    const loadCategories = async () => {
        try {
            let url = `${endpoints['restaurantCategories'](restaurantId)}`

            let res = await RestaurantAPIs.get(url);

            let dictionaryCategories = res.data.results.map(c => ({
                label: c.name,
                value: c.id
            }));
            console.info(url)
            setCategoriesItems(dictionaryCategories)
        }
        catch (ex) {
            console.error('aaaaa' + ex);
        } finally {
            console.info('Done');
        }
    }

    const addFood = async () => {
        setLoading(true);
        try {
            const form = new FormData();

            for (let f in food)
                if (f !== 'confirm')
                    form.append(f, food[f]);
            form.append('category', value);
            form.append('serve_period', valueTime || 'Cả ngày');
            form.append('is_available', true);
            if (image) {
                form.append('image', {
                    uri: image.uri,
                    name: image.uri.split('/').pop(),
                    type: 'image/png'
                });
            }
            else {
                form.append('image', 'Have not uploaded photos yet');
            }

            console.info("Serve period gửi lên::", valueTime);
            console.info("Form data:", Array.from(form.entries()));
            const response = await RestaurantAPIs.post(`${endpoints['createFood'](restaurantId)}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 201) {
                console.log(response.data);
                setFood({
                    "name": "",
                    "price": "",
                    "description": ""
                });
                setImage('');
                Alert.alert('Thành công', 'Món ăn mới đã được thêm!');
                // Gọi callback khi quay về
                if (onGoBack) onGoBack();
                navigation.goBack();
            }

        }
        catch (ex) {
            if (ex.response) {
                console.error('Server trả về lỗi:', ex.response.data);
                Alert.alert('Lỗi', ex.response.data.message || 'Không thể thêm món ăn.');
            } else {
                console.error('Lỗi không xác định:', ex.message);
                Alert.alert('Lỗi', 'Không thể thêm món ăn. Vui lòng thử lại.');
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCategories();
    }, [restaurantId]);

    return (

        <View style={{ flex: 1 }}>
            <ScrollView nestedScrollEnabled={true}>
                <>
                    {Object.values(foods).map(f =>
                        <View key={f.field}>
                            <Text style={{ marginTop: 5, fontSize: 17, fontWeight: 'bold' }}> {f.title}: </Text>
                            <TextInput style={RestaurantStyles.inputMargin}
                                mode="outlined"
                                value={food[f.field]}
                                keyboardType={f.keyboardType}
                                onChangeText={text => updateFood(text, f.field)}
                            />
                        </View>
                    )}

                </>
                <View style={RestaurantStyles.dropDownStyle}>
                    <Text style={{ marginTop: 5, fontSize: 17, fontWeight: 'bold' }}> Hình ảnh: </Text>
                    <Button mode="outlined" onPress={pickImage}>
                        Chọn hình ảnh
                    </Button>
                    {image ? <Image source={{ uri: image.uri }} style={{ width: 100, height: 100, margin: 10, borderRadius: 15 }} /> : ""}
                </View>
                <Text style={{ marginTop: 5, fontSize: 17, fontWeight: 'bold' }}> Danh mục: </Text>
                <View style={RestaurantStyles.dropDownStyle}>
                    <DropDownPicker style={{ marginTop: 10 }}
                        open={open}
                        value={value}
                        items={categoriesItems}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setCategoriesItems}
                        listMode="SCROLLVIEW"
                        placeholder="Chọn danh mục"
                    />
                </View>
                <Text style={{ marginTop: 5, fontSize: 17, fontWeight: 'bold' }}> Thời điểm bán: </Text>
                <View style={RestaurantStyles.dropDownStyle}>
                    <DropDownPicker style={{ marginTop: 10 }}
                        open={openTime}
                        value={valueTime}
                        items={timeItems}
                        setOpen={setTimeOpen}
                        setValue={setTimeValue}
                        setItems={setTimeItems}
                        listMode="SCROLLVIEW"
                        placeholder="Chọn thời điểm bán"
                    />
                </View>
                <Button icon="plus" mode="contained" style={[RestaurantStyles.addBtn]}
                    onPress={addFood}
                    loading={loading}
                    disabled={loading}>
                    Thêm
                </Button>
            </ScrollView>


        </View>
    );
};
export default AddFood