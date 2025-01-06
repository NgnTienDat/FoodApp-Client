import { useEffect, useState } from "react";
import { View, Text, FlatList, Alert, TouchableOpacity, RefreshControl, } from "react-native";
import { Button, TextInput, Checkbox } from "react-native-paper";
import RestaurantStyles from "../../../styles/RestaurantStyles";
import RestaurantAPIs, { endpoints } from "../../../config/RestaurantAPIs";
import DropDownPicker from 'react-native-dropdown-picker';

const AddMenu = ({ navigation, route }) => {
    const { onGoBack } = route.params || {};
    const [loading, setLoading] = useState(false);
    const [nameMenu, setNameMenu] = useState("")
    const [openTime, setTimeOpen] = useState(false);
    const [valueTime, setTimeValue] = useState(null);
    const [timeItems, setTimeItems] = useState([
        { label: 'Sáng', value: 'Sáng' },
        { label: 'Trưa', value: 'Trưa' },
        { label: 'Chiều', value: 'Chiều' },
        { label: 'Tối', value: 'Tối' },
        { label: 'Cả ngày', value: 'Cả ngày' },
    ]);

    const [checkedFoods, setCheckedFoods] = useState({});
    const restaurantId = 1
    const [page, setPage] = useState(1);
    const [foods, setFoods] = useState([]);

    const loadFoods = async () => {
        if (page > 0) {
            setLoading(true)
            try {
                let url = `${endpoints['restaurantFoods'](restaurantId)}?page=${page}`
                console.info(url)
                let res = await RestaurantAPIs.get(url);
                // console.info(res.data.results)
                if (page > 1)
                    setFoods(current_res => [...current_res, ...res.data.results])
                else
                    setFoods(res.data.results)

                if (!res.data.next) {
                    setPage(0);
                }
            } catch (ex) {
                console.error('aaaaa' + ex);
            } finally {
                setLoading(false);
            }
        }
    }

    const addMenu = async () => {
        setLoading(true);
        try {
            //logic add menu
            const form = new FormData();
            form.append('name', nameMenu);
            form.append('serve_period', valueTime);
            form.append('active', true);
            //cập nhật món ăn trong menu
            const selectedFoodIds = Object.entries(checkedFoods)
                .filter(([_, checked]) => checked)
                .map(([id]) => Number(id));

            console.info(JSON.stringify(selectedFoodIds))

            form.append('food', selectedFoodIds);
            //
            const response = await RestaurantAPIs.post(`${endpoints['createMenu'](restaurantId)}`, form, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 201) {
                console.log(response.data);
            }

            Alert.alert('Thành công', 'Menu đã được thêm mới!');
            if (onGoBack) onGoBack();
            navigation.goBack();
        }
        catch (ex) {
            if (ex.response) {
                console.error('Server trả về lỗi:', ex.response.data);
                Alert.alert('Lỗi', ex.response.data.message || 'Không thể thêm menu.');
            } else {
                console.error('Lỗi không xác định:', ex.message);
                Alert.alert('Lỗi', 'Không thể thêm menu. Vui lòng thử lại.');

            }
        } finally {
            console.log('Đã thêm xong')
        }
    }



    useEffect(() => {
        loadFoods();
    }, [restaurantId, page]);

    const loadMore = () => {
        if (page > 0 && !loading)
            setPage(page + 1);
    }
    const refresh = () => {
        setPage(1);
        loadFoods();
    }

    return (
        <View style={{ flex: 1 }}>
            <>
                {/* <Text> {detailMenu.name}</Text> */}
                <Text style={{ margin: 5, fontSize: 17, fontWeight: 'bold' }}>Tên menu:</Text>
                <TextInput style={RestaurantStyles.inputMargin}
                    mode="outlined"
                    onChangeText={text => setNameMenu(text)}
                    placeholder="Tên menu mới ..."
                />

                <Text style={{ marginTop: 5, fontSize: 17, fontWeight: 'bold' }}> Thời điểm phục vụ: </Text>
                <View style={RestaurantStyles.dropDownStyle}>
                    <DropDownPicker style={{ marginTop: 10 }}
                        open={openTime}
                        value={valueTime}
                        items={timeItems}
                        setOpen={setTimeOpen}
                        setValue={setTimeValue}
                        setItems={setTimeItems}
                        listMode="SCROLLVIEW"
                        placeholder="Chọn thời điểm phục vụ"
                    />
                </View>

            </>

            <View>
                <Text style={{ marginTop: 5, fontSize: 17, fontWeight: 'bold' }}>  Các món ăn: </Text>
                <FlatList style={RestaurantStyles.scrollViewStyle}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
                    onEndReached={loadMore}
                    data={foods}
                    keyExtractor={(item, index) => `food-${item.id}-${index}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={[RestaurantStyles.dishCard, { justifyContent: 'space-between' }]}
                            key={`${item.id}-${Math.random()}`}>
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 10 }}>
                                <Text style={RestaurantStyles.dishName}>{item.name}</Text>
                                <Text>Thành tiền: {item.price} VNĐ</Text>
                            </View>
                            <View>
                                <Checkbox
                                    status={checkedFoods[item.id] ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setCheckedFoods(prev => ({
                                            ...prev,
                                            [item.id]: !prev[item.id]
                                        }));
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                    refreshing={loading}
                    onRefresh={loadFoods}
                />
            </View>
            <View >
                <Button icon="plus" mode="contained" style={[RestaurantStyles.addBtn]}
                    onPress={addMenu}
                >
                    Thêm menu
                </Button>
            </View>
        </View>
    );
}
export default AddMenu;