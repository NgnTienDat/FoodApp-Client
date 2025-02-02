import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MyUserContext } from "../../config/UserContexts";
import RestaurantAPIs, { endpoints } from "../../config/RestaurantAPIs";
import React, { useState, useEffect, useContext } from "react";

const RestaurantLocation = () => {
    const [location, setLocation] = useState(null);
    const user = useContext(MyUserContext);
    const restaurantId = user.restaurant_id;

    const loadRestaurant = async () => {
        try {
            console.info(user.id);
            const res = await RestaurantAPIs.get(endpoints['restaurant'](restaurantId));

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
