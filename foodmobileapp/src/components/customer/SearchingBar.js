import { Button, Text, TextInput, TouchableOpacity, View } from "react-native"
import CustomerStyles from "../../styles/CustomerStyles"
import { Icon } from "react-native-paper"


const MySearchBar = () => {
    return (

        <View>
            <View style={CustomerStyles.searcherContainer}>
                <View style={CustomerStyles.searchBox}>
                    <Icon source="magnify" size={20} color="#666" />
                    <TextInput
                        style={CustomerStyles.searchText}
                        placeholder="Bánh Mì Chim Chay Giảm 50%"
                        placeholderTextColor="#999"
                    />

                </View>
                <TouchableOpacity style={CustomerStyles.cancelInput} onPress={() => console.log("hủy")}>
                    <Text style={{
                        fontSize: 16, 
                        color: 'red',
                    }}>Hủy</Text>
                </TouchableOpacity>
            </View>
            


        </View>

    )
}

export default MySearchBar