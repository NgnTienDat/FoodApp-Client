import React from 'react';
import {
    View,
    Text,
    FlatList,
    ScrollView,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { renderHorizontalItems } from '../../components/customer/HomeHeader';

const HomeScreenTest = () => {


    const renderVerticalItem = ({ item }) => {
        return (
            <View style={{
                width: Dimensions.get('window').width - 20,
                height: 80,
                marginVertical: 5,
                backgroundColor: '#FF9500',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
            }}>
                <Text style={styles.itemText}>V{item + 1}</Text>
            </View>
        );
    };

    return (
        <View style={{
            flex: 1,
            paddingTop: 50,
            backgroundColor: '#fff',
        }}>

            <FlatList
                ListHeaderComponent={renderHorizontalItems()}
                data={Array.from({ length: 10 }, (_, i) => i)}
                renderItem={renderVerticalItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingHorizontal: 10, }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },


    flatListContainer: {

    },
    verticalItem: {
        width: Dimensions.get('window').width - 20,
        height: 80,
        marginVertical: 5,
        backgroundColor: '#FF9500',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },

});

export default HomeScreenTest;