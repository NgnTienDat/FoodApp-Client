import { Text, TouchableOpacity, View } from "react-native"
import CustomerStyles from "../../styles/CustomerStyles"

const AccountHeader = () => {
    return (
        <View style={CustomerStyles.container_account_header}>
            <TouchableOpacity style={CustomerStyles.addressContainer}>
                <Text>heh</Text>
            </TouchableOpacity>
        </View>
    )
}
export default AccountHeader