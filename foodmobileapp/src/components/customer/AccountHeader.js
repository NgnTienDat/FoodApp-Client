import { Image, Text, TouchableOpacity, View } from "react-native"
import CustomerStyles from "../../styles/CustomerStyles"
import RestaurantStyles from "../../styles/RestaurantStyles"

const AccountHeader = () => {
    return (
        <View style={CustomerStyles.container_account_header}>
            <TouchableOpacity style={CustomerStyles.addressContainer}>
                <Image source={{ uri: 'dd.jpg' }} style={RestaurantStyles.storeImage} />
                <Text style={{
                    color: '#fff',
                    fontSize: 18, alignSelf:'center'
                }}>Nguyễn Đạt</Text>
            </TouchableOpacity>
        </View>
    )
}
export default AccountHeader