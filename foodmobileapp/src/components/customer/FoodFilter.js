import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FoodFilter = () => {

    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const priceRanges = [
        'Dưới 20.000vnd',
        '20.000 - 50.000vnd',
        '50.000 - 100.000vnd',
        '100.000 - 200.000vnd',
        'Trên 200.000vnd'
    ];

    const categories = ['Cà phê', 'Bánh mì', 'Bún/Phở', 'Trà sữa', 'Cơm'];

    const toggleCategory = (category) => {
        setSelectedCategories((prev) => {
            if (prev.includes(category)) {
                return prev.filter((item) => item !== category);
            } else {
                return [...prev, category];
            }
        });
    };

    const applyFilters = () => {
        onApply({ priceRange: selectedPriceRange, categories: selectedCategories });
    };

    return (
        <View style={styles.container}>

            <ScrollView>
                <Text style={styles.sectionTitle}>Khoảng giá</Text>
                <View style={styles.optionsContainer}>
                    {priceRanges.map((range, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.option,
                                selectedPriceRange === range && styles.optionSelected
                            ]}
                            onPress={() => setSelectedPriceRange(range)}
                        >
                            <Text
                                style={
                                    selectedPriceRange === range
                                        ? styles.optionTextSelected
                                        : styles.optionText
                                }
                            >
                                {range}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Danh mục</Text>
                <View style={styles.optionsContainer}>
                    {categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.option,
                                selectedCategories.includes(category) && styles.optionSelected
                            ]}
                            onPress={() => toggleCategory(category)}
                        >
                            <Text
                                style={
                                    selectedCategories.includes(category)
                                        ? styles.optionTextSelected
                                        : styles.optionText
                                }
                            >
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
                <Text style={styles.applyButtonText}>Áp dụng</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginRight: 8,
    },
    cancelButton: {
        color: 'red',
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    option: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 4,
    },
    optionSelected: {
        backgroundColor: '#ddd',
        borderColor: '#000',
    },
    optionText: {
        color: '#000',
    },
    optionTextSelected: {
        color: '#000',
        fontWeight: 'bold',
    },
    applyButton: {
        backgroundColor: 'orange',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
    },
    applyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FoodFilter;