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
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    return (
        <TouchableHighlight
            style={styles.foodItem}
            key={item.id}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => nav.navigate(routeName, params)}
            disabled={!item.is_available}  // Nếu không có sẵn thì vô hiệu hóa
        >
            <>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.foodImage} />
                    {
                        !item.is_available && (
                            <View style={styles.soldOutOverlay}>
                                <Text style={styles.soldOutText}>Đã hết</Text>
                            </View>
                        )
                    }
                </View>
                <View style={styles.foodInfo}>
                    <Text style={styles.foodName}>{item.name}</Text>
                    <Text style={styles.foodPrice}>{item.description}</Text>
                    <Text style={styles.foodPrice}>{formatPrice(item.price)}đ</Text>
                </View>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => nav.navigate(routeName, params)}
                    disabled={!item.is_available} 
                >
                    <Text style={styles.addText}>+</Text>
                </TouchableOpacity>
            </>
        </TouchableHighlight>
    );
};

export const styles = StyleSheet.create({
    foodItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 5,
    },
    imageContainer: {
        position: 'relative',
    },
    foodImage: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 5,
    },
    soldOutOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // màu đen với opacity 0.5
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    soldOutText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    foodInfo: {
        flex: 1,
        paddingLeft: 10
    },
    foodName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    foodPrice: {
        fontSize: 18,
        color: '#EE4D2D',
        fontWeight: 'bold',
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
        fontWeight: 'bold',
    },
});

export default RestaurantItem;