import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useState, useEffect } from "react";
import APIs, { endpoints } from "../../config/APIs";

const RestaurantLocation = ({route}) => {
    const restaurantId = route.params?.RestaurantId;
    const [location, setLocation] = useState(null)

    const loadRestaurant = async () => {
        try {
           
            let res = await APIs.get(endpoints['restaurant-detail'](restaurantId));

            console.info(res.data.latitude, res.data.longitude);

            const latitude = parseFloat(res.data.latitude);
            const longitude = parseFloat(res.data.longitude);

            setLocation({
                latitude,
                longitude,
                latitudeDelta: 0.01,  // Điều chỉnh mức zoom
                longitudeDelta: 0.01,
            });
        } catch (ex) {
            console.error(ex);
        }
    };

    useEffect(() => {
        if (restaurantId) {
            loadRestaurant();
        }
    }, [restaurantId]);

    return (
        <View style={styles.container}>
            {location ? (
                <MapView
                    style={styles.map}
                    region={location}
                    showsUserLocation
                    showsMyLocationButton
                >
                    <Marker coordinate={location} title="Nhà hàng của bạn" />
                </MapView>
            ) : (
                <Text>Đang tải vị trí...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});

export default RestaurantLocation;
