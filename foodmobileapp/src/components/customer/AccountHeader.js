import { Image, Text, TouchableOpacity, View } from "react-native"
import CustomerStyles from "../../styles/CustomerStyles"
import RestaurantStyles from "../../styles/RestaurantStyles"
import { useContext } from "react"
import { MyUserContext } from "../../config/UserContexts"
import { authApis, endpoints } from "../../config/APIs"

const AccountHeader = () => {

    const user = useContext(MyUserContext)
    
    const infoUser = async () => {
        
        console.info('CURRENTUSER')
        console.info(user)
    }
    return (
        <View style={CustomerStyles.container_account_header}>
            {user === null ?
                <TouchableOpacity style={CustomerStyles.accountHeaderContainer}>
                    <Image source={{ uri: 'dd.jpg' }} style={RestaurantStyles.storeImage} />
                    <Text style={{ color: '#fff', fontSize: 18, alignSelf: 'center' }}>
                        Chưa đăng nhập
                    </Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={CustomerStyles.accountHeaderContainer} onPress={infoUser}>
                    <Image source={{ uri: user.avatar }} style={RestaurantStyles.storeImage} />
                    <Text style={{ color: '#fff', fontSize: 18, alignSelf: 'center' }}>
                       {user.username}
                    </Text>
                </TouchableOpacity>
            }

        </View>
    )
}
export default AccountHeader