import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import Styles from "../../styles/RestaurantStyles";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-paper';

const RestaurantProfile = () => {
    return (
        <SafeAreaView style={Styles.container}>
            <View style={Styles.headerProfile}>
                <Image
                    source={{ uri: '' }}
                    style={Styles.avatar}
                />
                <Text style={Styles.storeName}>Name Food Store</Text>
                <Text style={Styles.rating}>⭐: 5.0</Text>
                <Text style={Styles.phone}>📞: 0901 234 567</Text>
                <Text style={Styles.infoText}>📍: Địa chỉ: 123 Đường ABC, Quận 1, TP. HCM</Text>
            </View>

            <View style={Styles.infoContainer}>

            </View>

            <View>
                <TouchableOpacity style={Styles.dishCard}>
                    <Icon source="cog" size={30} />
                    <Text style={Styles.subject} >Cài đặt</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.dishCard}>
                    <Icon source="information-outline" size={30} />
                    <Text style={Styles.subject}>Thay đổi thông tin cá nhân</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.dishCard}>
                    <Icon source="logout" size={30} />
                    <Text style={Styles.subject}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
export default RestaurantProfile;