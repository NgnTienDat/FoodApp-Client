import { Text, TouchableOpacity } from "react-native"
import CustomerStyles from "../../styles/CustomerStyles"

const CustomButton = ({name, route}) => {
    return (
        <TouchableOpacity style={CustomerStyles.loginButton} onPress={route}>
            {/* {loading && <ActivityIndicator style={{ marginRight: 10 }} color="#fff" />} */}
            <Text style={CustomerStyles.logoutText}>{name}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton