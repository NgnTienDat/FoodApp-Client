import { View, Text, TouchableOpacity } from "react-native";
import Styles from "../../styles/RestaurantStyles";
import { Icon } from 'react-native-paper';

const RestaurantMenu = ({ navigation }) => {
    return (
        <View>
            <TouchableOpacity style={Styles.containerCardMenu}
                onPress={() => navigation.navigate('menu')}>
                <Icon source="food-hot-dog" size={30} />
                <Text style={Styles.cardChoiceName} >Món ăn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.containerCardMenu}
                onPress={() => navigation.navigate('category_food')}>
                <Icon source="food-variant" size={30} />
                <Text style={Styles.cardChoiceName}>Danh mục món ăn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.containerCardMenu}
                onPress={() => navigation.navigate('sale_schedule')}>
                <Icon source="store-clock-outline" size={30} />
                <Text style={Styles.cardChoiceName}>Lịch bán</Text>
            </TouchableOpacity>
        </View>
    );
}
export default RestaurantMenu;