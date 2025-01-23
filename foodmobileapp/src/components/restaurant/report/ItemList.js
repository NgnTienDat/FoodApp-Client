import { View, Text, FlatList } from "react-native";
import RestaurantStyles from "../../../styles/RestaurantStyles";

const ItemList = ({ data }) => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item, index) => `${item.food__name}-${index}`}
            renderItem={({ item }) => (
                <View style={RestaurantStyles.listItem}>
                    <Text style={RestaurantStyles.listItemText}>{item.food__name}</Text>
                    <Text style={RestaurantStyles.listItemValue}>{item.order_date}</Text>
                    <Text style={RestaurantStyles.listItemValue}>{item.total_order}</Text>
                    <Text style={RestaurantStyles.listItemValue}>{item.total_sale} VNĐ</Text>
                </View>

            )}
        />
    );
};
export default ItemList;