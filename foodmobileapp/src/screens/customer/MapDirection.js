import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const MapDirections = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = async (text) => {
        setQuery(text);

        if (text.length > 1) { // Chỉ thực hiện request khi nhập > 2 ký tự
            try {
                const response = await axios.get(
                    `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json`,
                    {
                        params: {
                            input: text,
                            key: 'AlzaSyVAMUgPYQZuhs-e59WyqvXT3vI6fHbHJ8Q', 
                        },
                    }
                );

                // Lấy danh sách gợi ý từ API
                setSuggestions(response.data.predictions || []);
            } catch (error) {
                console.error('Error fetching autocomplete suggestions:', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nhập địa điểm..."
                value={query}
                onChangeText={handleInputChange}
            />

            <FlatList
                data={suggestions}
                keyExtractor={(item) => item.place_id}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <Text style={styles.suggestion}>{item.description}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
    },
    suggestion: {
        padding: 12,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
});


export default MapDirections;