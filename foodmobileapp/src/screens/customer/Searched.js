import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";

import TopTab from "../../components/customer/TopTab";
import CustomerStyles from "../../styles/CustomerStyles";
import { useNavigation } from "@react-navigation/native";


const data = [
    {
        id: "1",
        restaurant: "Popeyes - Lê Văn Lương",
        items: [
            { id: "1-1", name: "Gà rán 3 miếng", price: "75.000đ", image: "image-url-1" },
            { id: "1-2", name: "Combo gà cứng", price: "75.000đ", image: "image-url-2" },
        ],
    },
    {
        id: "2",
        restaurant: "Texas - Lê Văn Lương",
        items: [
            { id: "2-1", name: "Gà rán 3 miếng", price: "75.000đ", image: "image-url-3" },
            { id: "2-2", name: "Combo gà cứng", price: "75.000đ", image: "image-url-4" },
        ],
    },

];

const renderItems = ({ item }) => (
    <View style={CustomerStyles.itemContainer} key={item.id}>
        <Image source={{ uri: item.image }} style={CustomerStyles.itemImage} />
        <View style={CustomerStyles.itemInfo}>
            <Text style={CustomerStyles.itemName}>{item.name}</Text>
            <Text style={CustomerStyles.itemPrice}>{item.price}</Text>
        </View>
    </View>
);



const FoodRoute = ({ foods }) => {
    const nav = useNavigation()

    return (
        <View>

            <FlatList
                data={foods}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={CustomerStyles.restaurantContainer}
                        onPress={() => nav.navigate('RestaurantScreen', {'RestaurantId':item.id})}
                    >
                        <View style={CustomerStyles.header}>
                            <Image source={{ uri: item.image }} style={CustomerStyles.restaurantImage} />
                            <View style={CustomerStyles.restaurantInfo}>
                                <Text style={CustomerStyles.restaurantName}>{item.restaurant}</Text>
                                <Text style={CustomerStyles.restaurantDetails}>
                                    {item.distance} km - {item.rating} ⭐
                                </Text>
                            </View>
                        </View>

                        {item.items.map((food) => renderItems({ item: food }))}


                    </TouchableOpacity>
                )}
            />
        </View>
    )
}


const RestaurantRoute = () => {
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={CustomerStyles.restaurantContainer}>
                        <Text style={CustomerStyles.restaurantName}>{item.restaurant}</Text>
                        {item.items.map((food) => renderItems({ item: food }))}
                    </View>
                )}
            />
        </View>
    )
}

const SearchedScreen = ({ route }) => {
    const { foods } = route.params;
    console.log('foods: ', foods)
    const tabsForFoods = [
        { name: "Bạn đang tìm", component: () => <FoodRoute foods={foods} /> },
        // { name: "Nhà hàng", component: () => <RestaurantRoute/> },

    ];
    return (
        <View style={{ flex: 1 }}>
            <TopTab tabs={tabsForFoods} />
        </View>

    )
}
export default SearchedScreen


