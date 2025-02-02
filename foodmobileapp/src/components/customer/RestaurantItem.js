import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import CustomerStyles from "../../styles/CustomerStyles";

const RestaurantItem = ({ item, routeName, params }) => {
    const nav = useNavigation();

    return (
        <TouchableOpacity style={CustomerStyles.flatListNearRestaurant} 
            onPress={() => nav.navigate(routeName, params)}
        >
            <Image
                source={{ uri: item.image }}
                style={CustomerStyles.flatListNearRestaurantImage}
            />
            <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>{item.name}</Text>
                <Text>{item.address}</Text>
                <Text style={{ marginTop: 5 }}>⭐ {item.star_rate}</Text>
            </View>
        </TouchableOpacity>
    )

}

export const FoodItem = ({ item, routeName, params }) => {
    const nav = useNavigation();


    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price)
    };

    return (
        <TouchableHighlight
            style={styles.foodItem}
            key={item.id}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => nav.navigate(routeName, params)}
        >
            <>
                <Image source={{ uri: item.image }} style={styles.foodImage} />
                <View style={styles.foodInfo}>
                    <Text style={styles.foodName}>{item.name}</Text>
                    <Text style={styles.foodPrice}>{item.description}</Text>
                    <Text style={styles.foodPrice}>{formatPrice(item.price)}đ</Text>
                </View>
                <TouchableOpacity style={styles.addButton} onPress={() => nav.navigate(routeName, params)}>
                    <Text style={styles.addText}>+</Text>
                </TouchableOpacity>
            </>
        </TouchableHighlight>
    )

}

const styles = StyleSheet.create({

foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
},
foodImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5
},
foodInfo: {
    flex: 1
},
foodName: {
    fontSize: 16
},
foodPrice: {
    fontSize: 18,
    color: '#EE4D2D',
    fontWeight: 'bold'
},
addButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#EE4D2D',
    alignItems: 'center',
    justifyContent: 'center',
},
addText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
},
});
export default RestaurantItem;