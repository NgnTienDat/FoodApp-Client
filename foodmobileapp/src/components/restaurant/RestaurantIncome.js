import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import Styles from "../../styles/RestaurantStyles";
import { SafeAreaView } from 'react-native-safe-area-context';

const RestaurantIncome = () => {
    return (
        <View style={Styles.container}>
            <ScrollView >

                <View style={Styles.container}>
                    <View>
                        <Text style={Styles.subject}>Tổng thu nhập hôm nay</Text>
                        <Text style={Styles.incomeNumber}>2.089.135 VNĐ</Text>
                    </View>
                </View>
                <View style={Styles.switchContainer}>
                    <View>
                        <Text style={Styles.subject}>Tổng đơn hàng</Text>
                        <Text style={Styles.incomeNumber}>30</Text>
                    </View>
                    <View>
                        <Text style={Styles.subject}>Đơn hàng thành công</Text>
                        <Text style={Styles.incomeNumber} >22</Text>
                    </View>
                </View>

                <Text style={Styles.sectionTitle}>Đơn hàng của bạn</Text>
                <View style={Styles.dishList}>
                    <TouchableOpacity style={Styles.dishCard}>
                        <View>
                            <Text style={Styles.oderName}>Đơn hàng 1</Text>
                            <Text style={Styles.dishName}>Giá trị: 124.000 VNĐ</Text>
                            <Text style={Styles.dishName}>Ngày: 14/12/2024</Text>
                            <Text style={Styles.dishName}>Trạng thái: Thành công</Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.dishCard}>
                        <View>
                            <Text style={Styles.oderName}>Đơn hàng 2</Text>
                            <Text style={Styles.dishName}>Giá trị: 124.000 VNĐ</Text>
                            <Text style={Styles.dishName}>Ngày: 14/12/2024</Text>
                            <Text style={Styles.dishName}>Trạng thái: Thành công</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.dishCard}>
                        <View>
                            <Text style={Styles.oderName}>Đơn hàng 3</Text>
                            <Text style={Styles.dishName}>Giá trị: 124.000 VNĐ</Text>
                            <Text style={Styles.dishName}>Ngày: 14/12/2024</Text>
                            <Text style={Styles.dishName}>Trạng thái: Thành công</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
export default RestaurantIncome;