import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-paper';
import APIs, { endpoints } from '../../config/APIs';
import Animated, { Extrapolation, interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 400;
const HEADER_HEIGHT = 100;
const SEARCH_HEIGHT = 54; // Search container height including padding

const RestaurantScreen = ({ route }) => {
    const restaurantId = route.params?.RestaurantId;
    const [searchQuery, setSearchQuery] = useState('');
    const [restaurant, setRestaurant] = useState(null);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false);
    const nav = useNavigation();

    const scrollRef = useAnimatedRef();
    const scrollOffset = useScrollViewOffset(scrollRef);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    const loadRestaurant = async () => {
        try {
            setLoading(true);
            let res = await APIs.get(endpoints['restaurant-detail'](restaurantId));
            setRestaurant(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    };

    const loadFood = async () => {
        try {
            setLoading(true);
            let res = await APIs.get(endpoints['restaurant-foods'](restaurantId));
            setFoods(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRestaurant();
        loadFood();
    }, [restaurantId]);

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.5],
                        Extrapolation.CLAMP
                    ),
                },
            ],
        };
    });

    const headerAnimatedStyles = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollOffset.value, [0, IMG_HEIGHT / 2], [0, 1],
            )
        }
    });

    const searchAnimatedStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            top: Math.max(
                HEADER_HEIGHT,
                interpolate(
                    scrollOffset.value,
                    [0, IMG_HEIGHT - HEADER_HEIGHT],
                    [IMG_HEIGHT, HEADER_HEIGHT],
                    Extrapolation.CLAMP
                )
            ),
            left: 0,
            right: 0,
            zIndex: 2,
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header, headerAnimatedStyles]}>
                {restaurant && (
                    <Text style={styles.restaurantNameHeader}>{restaurant.name}</Text>
                )}
            </Animated.View>

            <TouchableOpacity style={styles.backButton} onPress={() => nav.goBack()}>
                <Icon source="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>

            <Animated.View style={[styles.searchContainer, searchAnimatedStyle]}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm món ăn"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </Animated.View>

            <Animated.ScrollView
                ref={scrollRef}
                scrollEventThrottle={16}
                contentContainerStyle={{
                    paddingTop: IMG_HEIGHT + SEARCH_HEIGHT
                }}
            >
                {restaurant && (
                    <Animated.Image
                        source={{ uri: restaurant.image }}
                        style={[styles.restaurantImage, imageAnimatedStyle, { position: 'absolute', top: 0 }]}
                    />
                )}

                {restaurant && (
                    <View style={styles.restaurantInfo}>
                        <Text style={styles.restaurantName}>{restaurant.name}</Text>
                        <View style={styles.restaurantDetails}>
                            <Text style={styles.rating}>⭐ {restaurant.star_rate}</Text>
                            <Text style={styles.address}>Địa chỉ: {restaurant.address}</Text>
                        </View>
                    </View>
                )}

                {foods.map((item) => (
                    <TouchableHighlight
                        style={styles.foodItem}
                        key={item.id}
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={() => console.info('Pressed!')}
                    >
                        <>
                            <Image source={{ uri: item.image }} style={styles.foodImage} />
                            <View style={styles.foodInfo}>
                                <Text style={styles.foodName}>{item.name}</Text>
                                <Text style={styles.foodPrice}>{item.description}</Text>
                                <Text style={styles.foodPrice}>{formatPrice(item.price)}đ</Text>
                            </View>
                            <TouchableOpacity style={styles.addButton}>
                                <Text style={styles.addText}>+</Text>
                            </TouchableOpacity>
                        </>
                    </TouchableHighlight>
                ))}
            </Animated.ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa'
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        position: 'absolute',
        height: HEADER_HEIGHT,
        zIndex: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        top: 50,
        left: 10,
        padding: 8,
        backgroundColor: '#a49d997d',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        position: 'absolute'
    },
    restaurantInfo: {
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        paddingTop: 10,
    },
    restaurantName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    restaurantDetails: {
        flexDirection: 'row',
        marginTop: 5
    },
    rating: {
        fontSize: 16,
        marginRight: 10
    },
    address: {
        fontSize: 16,
        color: '#666',
        flexWrap: 'wrap',
        width: '90%',
    },
    searchContainer: {
        backgroundColor: '#fff',
        padding: 7,
        width: '100%',
        height: SEARCH_HEIGHT,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
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
    restaurantImage: {
        width: width,
        height: IMG_HEIGHT,
    },
    restaurantNameHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 50,
        marginTop: 37
    }
});

export default RestaurantScreen;