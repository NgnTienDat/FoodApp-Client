import { Text, TouchableOpacity, View } from "react-native"
import Colors from "../../config/Colors"
import { useNavigation } from "@react-navigation/native"

const AfterOrder = () => {
    const nav = useNavigation()

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', flex: 1 }}>
            <Text style={{ fontSize: 18, margin: 20}}>Thanh toán thành công !!</Text>
            <TouchableOpacity style={{ backgroundColor: Colors.ShoppeOrange, padding: 10, borderRadius: 5 }} onPress={() => nav.navigate('MainTabs')}>
                <Text style={{ fontSize: 18, color: '#fff' }}>Quay về trang chủ</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AfterOrder