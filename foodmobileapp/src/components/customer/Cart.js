import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Icon } from "react-native-paper"

const CartIcon = ({itemNumbers}) => {
         
    const nav = useNavigation()

    return (
        <View >
            <View style={styles.container} >
                <Icon source="cart" size={30} color="black" />
                <View style={styles.badge}>

                    <Text style={styles.badgeText}
                    >{itemNumbers}</Text>
                </View>
            </View>

        </View>
    )
}
export default CartIcon

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: 30,
        width: 30,
        
    },
    badge: {
        position: 'absolute',
        right: -18,
        top: -18,
        backgroundColor: 'red',
        borderRadius: 20,
        paddingHorizontal: 7,
        // paddingVertical: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff'

    },
});