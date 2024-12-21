import React, { useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import RestaurantStyles from "../../styles/RestaurantStyles";
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';


const AddFood = () => {
    const [text, setText] = useState("")
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [categoriesItems, setCategoriesItems] = useState([
        { label: 'Cơm', value: 'com' },
        { label: 'Tráng miệng', value: 'trangmieng' }
    ]);

    const [openTime, setTimeOpen] = useState(false);
    const [valueTime, setTimeValue] = useState(null);
    const [timeItems, setTimeItems] = useState([
        { label: 'Sáng', value: 'sang' },
        { label: 'Trưa', value: 'trua' },
        { label: 'Chiều', value: 'chieu' },
        { label: 'Tối', value: 'toi' },
        { label: 'Cả ngày', value: 'allday' },
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

    return (

        <View style={{ flex: 1 }}>
            <ScrollView nestedScrollEnabled={true}>
                <View>
                    <Text style={{ marginTop: 5, fontSize: 17, fontWeight: 'bold' }}> Tên món ăn: </Text>
                    <TextInput style={RestaurantStyles.inputMargin}
                        label=" Cơm tấm, Bánh mì, Phở ..."
                        mode="outlined"
                        value={text}
                        onChangeText={text => setText(text)}
                    />
                </View>
                <View>
                    <Text style={{ marginTop: 5, fontSize: 17, fontWeight: 'bold' }}> Giá tiền: </Text>
                    <TextInput style={RestaurantStyles.inputMargin}
                        label=" 20.000 VND"
                        mode="outlined"
                        value={text}
                        onChangeText={text => setText(text)}
                    />
                </View>
                <View>
                    <Text style={{ marginTop: 5, fontSize: 17, fontWeight: 'bold' }}> Mô tả: </Text>
                    <TextInput style={RestaurantStyles.inputMargin}
                        label="Mô tả món ăn..."
                        mode="outlined"
                        value={text}
                        onChangeText={text => setText(text)}
                    />
                </View>
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
            </ScrollView>

            <Button icon="plus" mode="contained" style={[RestaurantStyles.addBtn]}
                onPress={() => console.log("Nhấn thêm")}>
                Thêm
            </Button>
        </View>
    );
};
export default AddFood