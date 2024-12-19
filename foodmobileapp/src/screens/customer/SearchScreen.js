import { Text, TouchableOpacity, View } from "react-native"
import CustomerStyles from "../../styles/CustomerStyles"
import MySearchBar from "../../components/customer/SearchingBar"


const SearchScreen = () => {
    return (

        <View>
            <MySearchBar />
            <TouchableOpacity style={CustomerStyles.filterButton} onPress={() => console.log("Filter Pressed")}>
                <Text style={{
                    fontSize: 16,
                    color: '#fff',
                }}>Bộ lọc</Text>
            </TouchableOpacity>
            

        </View>

    )
}

export default SearchScreen