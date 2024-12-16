import { Button, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import CustomerStyles from "../../styles/CustomerStyles"
import { Icon } from "react-native-paper"


const SearchScreen = () => {
    return (

        <View>
            <View style={CustomerStyles.searchContainer}>
                <Icon source="magnify" size={20} color="#666" />
                <TextInput
                    style={CustomerStyles.searchInput}
                    placeholder="Balzar De Cafe, Bánh Mì Chim Chay Giảm 50%"
                    placeholderTextColor="#999"
                />
            </View>
            <TouchableOpacity style={CustomerStyles.filterButton} onPress={() => console.log("Filter Pressed")}>
                <Text style={{
                    fontSize: 16,
                    color: '#000',
                }}>Bộ lọc</Text>
            </TouchableOpacity>

        </View>

    )
}

export default SearchScreen