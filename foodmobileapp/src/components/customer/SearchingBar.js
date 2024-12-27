import { Button, Text, TextInput, TouchableOpacity, View } from "react-native"
import CustomerStyles from "../../styles/CustomerStyles"
import { Icon } from "react-native-paper"
import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import APIs, { endpoints } from "../../config/APIs";

const MySearchBar = () => {
    const nav = useNavigation()
    const [query, setQuery] = useState('')
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)

    const searchFood = async () => {
        if (!query.trim()) return
        try {
            setLoading(true)
            let url = `${endpoints['foods']}?name=${query}`
            let res =  await APIs.get(url)

            console.info("result")
            console.info(res.data)
            
            setResult(res.data)
            // console.info("API Response:", res.data);
            // setResult(res.data);
            
        } catch (error) {
            console.info(error)
        } finally {
            setLoading(false)
        }
    }
    
    
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
                        onChangeText={setQuery}
                        value={query}
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