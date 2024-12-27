
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Icon } from 'react-native-paper';
import CustomerStyles from '../../styles/CustomerStyles';
import { Image } from 'react-native';
import APIs, { endpoints } from '../../config/APIs';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const HomeHeader = () => {
    const nav = useNavigation()
    return (

        <View style={CustomerStyles.container_home_header}>

            <TouchableOpacity style={CustomerStyles.addressContainer}>
                <Text style={CustomerStyles.deliverText}>Giao đến:</Text>
                <View style={CustomerStyles.addressRow}>
                    <Icon source="map-marker-outline" size={20} color="#fff" />
                    <Text style={CustomerStyles.addressText} numberOfLines={1}>
                        Phước Kiển, Nhà Bè, Hồ Chí Minh, Việt Nam
                    </Text>
                    <Icon source="chevron-right" size={20} color="#000" />
                </View>
            </TouchableOpacity>
            

            <View style={CustomerStyles.homeHeaderContainer}>
                <Icon source="magnify" size={20} color="#666" />
                <TouchableOpacity onPress={() => nav.navigate('SearchEngine')}>
                    
                        <Text style={{ fontSize: 14, color: '#999'}}>
                            Balzar De Cafe, Bánh Mì Chim Chay Giảm 50%
                        </Text>
                    
                </TouchableOpacity>

            </View>
        </View>

    );
};


export const MainCategory = () => {

    const [main_categories, setMainCategories] = useState([])

    const loadMainCategories = async () => {
        let res = await APIs.get(endpoints['main_categories'])
        setMainCategories(res.data)
        console.log(main_categories)
    }

    useEffect(() => {
        loadMainCategories()

    }, [])


    return (
        <View style={{ flex: 1, height: 155 }}>
            <ScrollView horizontal={true} style={CustomerStyles.scrollMainCategories}
                showsHorizontalScrollIndicator={false}>
                {main_categories.map((main_c) => (
                    <TouchableOpacity key={main_c.id}  //
                        style={CustomerStyles.itemMainCategories}>

                        <View style={CustomerStyles.mainCategoryImg}>
                            <Image source={{ uri: main_c.image }} style={{ width: 40, height: 40 }} />
                        </View>
                        <Text style={{ marginTop: 5, fontSize: 15 }}>{main_c.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Text style={CustomerStyles.nearRestaurant}>
                Quán ngon gần bạn
            </Text>
        </View>
    )
}

