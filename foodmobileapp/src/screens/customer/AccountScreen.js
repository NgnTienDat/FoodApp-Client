
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import CustomerStyles from "../../styles/CustomerStyles";
import AccountHeader from "../../components/customer/AccountHeader";
import { useNavigation } from "@react-navigation/native";

const AccountScreen = () => {

    const nav =useNavigation()

    return (
        <SafeAreaView style={CustomerStyles.safeArea}>
            <View>
                <AccountHeader />
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
                <TouchableOpacity style={CustomerStyles.logoutButton}>
                    <Text style={CustomerStyles.logoutText}>Đăng xuất</Text>
                </TouchableOpacity>

            </View>
            
        </SafeAreaView>
    )
}
export default AccountScreen