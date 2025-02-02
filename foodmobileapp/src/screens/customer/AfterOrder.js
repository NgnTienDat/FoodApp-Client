import { Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Colors from "../../config/Colors"
import { useNavigation } from "@react-navigation/native"

const AfterOrder = () => {
        const nav = useNavigation()
    
    return (
        // <SafeAreaView style={{backgroundColor: 'red'}}>
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc' , flex: 1}}>
                <Text style={{ fontSize: 18 }}>Thanh toán thành công</Text>
                <TouchableOpacity style={{backgroundColor: Colors.ShoppeOrange}} onPress={() => nav.navigate('MainTabs')}>
                    <Text style={{ fontSize: 18 }}>Quay về trang chủ</Text>
                </TouchableOpacity>
            </View>
        // </SafeAreaView>
    )
}

export default AfterOrder