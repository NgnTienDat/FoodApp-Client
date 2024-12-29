import { Text, TouchableOpacity, View } from "react-native"
import CustomerStyles from "../../styles/CustomerStyles"
import { useNavigation } from "@react-navigation/native"


const SearchScreen = () => {
    const nav = useNavigation()
    return (

        <View>
            
            <TouchableOpacity style={CustomerStyles.filterButton} onPress={() => console.log("Filter Pressed")}>
                <Text style={{
                    fontSize: 16,
                    color: '#fff',
                }}>Bộ lọc</Text>
            </TouchableOpacity>
            <TouchableOpacity style={CustomerStyles.filterButton} onPress={() => nav.navigate('SearchedScreen')}>
                <Text style={{
                    fontSize: 16,
                    color: '#fff',
                }}>SAU KHI NHẤN ENTER</Text>
            </TouchableOpacity>
            

        </View>

    )
}

export default SearchScreen