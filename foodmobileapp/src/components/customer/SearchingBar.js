import { Alert, Button, Text, TextInput, TouchableOpacity, View } from "react-native"
import CustomerStyles from "../../styles/CustomerStyles"
import { Icon } from "react-native-paper"
import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import APIs, { endpoints } from "../../config/APIs";

const MySearchBar = () => {
    const nav = useNavigation()
    const [querySearch, setQuerySearch] = useState('')
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)

    const searchFood = async () => {
        console.info("here1");
        if (!querySearch.trim()) return
        try {
            setLoading(true)
            console.info("here2");

            let url = `${endpoints['search-food']}?name=${querySearch}`
            // let url = `${endpoints['foods']}?name=${querySearch}`
            console.info("URL", url);

            let res = await APIs.get(url)


            console.info("API Response:", res.data);
            console.info("QuerySEarch:", querySearch);
            nav.navigate('SearchedScreen', {foods: res.data })
            setResult(res.data);


        } catch (error) {
            console.info(error)
        } finally {
            setLoading(false)
        }
    }
    const handleSearch = () => {
        Alert.alert('Tìm kiếm', `Bạn đã tìm: ${querySearch}`);
        // Thực hiện logic tìm kiếm ở đây (gọi API, điều hướng, v.v.)
    };



    return (

        <View style={{ marginTop: 70 }}>
            <View style={CustomerStyles.searcherContainer}>
                <HeaderBackButton onPress={() => nav.goBack()} />
                <View style={CustomerStyles.searchBox}>
                    <Icon source="magnify" size={20} color="#666" />
                    <TextInput
                        style={CustomerStyles.searchText}
                        placeholder="Bánh Mì Chim Chay Giảm 50%"
                        placeholderTextColor="#999"
                        onSubmitEditing={searchFood}
                        onChangeText={setQuerySearch}
                        value={querySearch}
                    />

                </View>

                <TouchableOpacity style={CustomerStyles.cancelInput} onPress={() => console.log("hủy")}>
                    <Text style={{
                        fontSize: 16,
                        color: '#EE4D2D',
                    }}>Hủy</Text>
                </TouchableOpacity>

            </View>
        </View>

    )
}

export default MySearchBar
// if (page>1) // lúc chuyển trang, load trang mới
//     setResult(cur_res => [...cur_res, res.data.results])
// else
//     setResult(res.data.results)

// if (res.data.next === null)
//         setPage(0);