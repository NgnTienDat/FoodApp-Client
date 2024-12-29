import { Text, TextInput, TouchableOpacity, View } from "react-native"
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
            

            


        </View>

    )
}

export default SearchScreen