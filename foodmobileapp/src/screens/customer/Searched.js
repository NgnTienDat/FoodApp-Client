


import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from 'react-native-tab-view';


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
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );

    
export const FoodRoute = () => (
    <View>
        <Text>MÓN ĂN</Text>
       
    </View>
);


export const RestaurantRoute = () => {
    return (
    <View>
       <Text> NHÀ HÀNG</Text>
    </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
    },
    cancelText: {
        marginLeft: 10,
        color: "red",
    },
    tabs: {
        flexDirection: "row",
        marginBottom: 10,
    },
    tabButton: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        borderBottomWidth: 2,
        borderColor: "transparent",
    },
    activeTab: {
        borderColor: "red",
    },
    tabText: {
        fontSize: 16,
        color: "#000",
    },
    restaurantContainer: {
        marginBottom: 20,
    },
    restaurantName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    itemImage: {
        width: 50,
        height: 50,
        backgroundColor: "#ccc",
        marginRight: 10,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 14,
        fontWeight: "bold",
    },
    itemPrice: {
        fontSize: 12,
        color: "#666",
    },
    addButton: {
        backgroundColor: "blue",
        borderRadius: 5,
        padding: 5,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
    },
});

 {/* List */}
        {/* <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.restaurantContainer}>
                    <Text style={styles.restaurantName}>{item.restaurant}</Text>
                    {item.items.map((food) => renderItems({ item: food }))}
                </View>
            )}
        /> */}