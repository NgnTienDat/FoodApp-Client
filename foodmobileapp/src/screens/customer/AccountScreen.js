
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import CustomerStyles from "../../styles/CustomerStyles";
import AccountHeader from "../../components/customer/AccountHeader";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { MyDispatchContext, MyUserContext } from "../../config/UserContexts";
import RestaurantStyles from "../../styles/RestaurantStyles";



const AccountScreen = () => {

    const nav = useNavigation()
    const user = useContext(MyUserContext)
    
    const dispatch = useContext(MyDispatchContext)
    // console.log("Giá trị user trong AccountScreen:\n", user);
    return (
        <SafeAreaView style={CustomerStyles.safeArea}>
            <View>
                <AccountHeader/>
                <ScrollView style={CustomerStyles.menuContainer}>
                    <TouchableOpacity style={CustomerStyles.menuItem}>
                        <Text style={CustomerStyles.menuText}>
                            <Text style={{ fontSize: 18 }}>⚙️</Text> Cài đặt
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={CustomerStyles.menuItem} onPress={() => nav.navigate('MyRestaurant')}>
                        <Text style={CustomerStyles.menuText}>
                            <Text style={{ fontSize: 18 }} >
                                🏠</Text> Nhà hàng của tôi
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={CustomerStyles.menuItem}>
                        <Text style={CustomerStyles.menuText}>
                            <Text style={{ fontSize: 18 }}>📍</Text> Địa chỉ
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
                {user === null ?
                    <TouchableOpacity style={CustomerStyles.logoutButton} onPress={() => nav.navigate('LoginScreen')}>
                        <Text style={CustomerStyles.logoutText}>Đăng nhập</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={CustomerStyles.logoutButton}
                        onPress={async () => { dispatch({ "type": "logout" }); nav.navigate('LoginScreen') }}>
                        <Text style={CustomerStyles.logoutText}>Đăng xuất</Text>
                    </TouchableOpacity>
                }

            </View>

        </SafeAreaView>
    )
}
export default AccountScreen