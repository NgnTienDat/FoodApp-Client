import { Text, TextInput, TouchableOpacity, View } from "react-native"
import CustomerStyles from "../../styles/CustomerStyles"
import { useNavigation } from "@react-navigation/native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { StyleSheet } from "react-native"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { useMainCategories } from "../../api/HookCustomer"
import { SearchContext } from "../../config/UserContexts"
import APIs, { endpoints } from "../../config/APIs"


const SearchScreen = () => {
    const nav = useNavigation()
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['66%'], []);
    const [loading, setLoading] = useState(false)
    const [selectedPriceRange, setSelectedPriceRange] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);
    const mainCategories = useMainCategories()
    const [result, setResult] = useState([])


    // const {searchKeyWord, filters, setFilters} = useContext(SearchContext)
    const priceRanges = [
        'Dưới 20.000đ',
        '20.000 - 50.000đ',
        '50.000 - 100.000đ',
        '100.000 - 200.000đ',
        'Trên 200.000đ'
    ];

    const priceRanges2 = [
        { name: 'Dưới 20.000đ', min_price: 0, max_price: 20000 },
        { name: '20.000 - 50.000đ', min_price: 20000, max_price: 50000 },
        { name: '50.000 - 100.000đ', min_price: 50000, max_price: 100000 },
        { name: '100.000 - 200.000đ', min_price: 100000, max_price: 200000 },
        { name: 'Trên 200.000đ', min_price: 200000, max_price: 1000000 },
    ];


    const categories = mainCategories.map((cate) => cate.name)
    // console.info(categories)


    const toggleCategory = (category) => {
        setSelectedCategories((prev) => {
            if (prev.includes(category)) {
                return prev.filter((item) => item !== category);
            } else {
                return [...prev, category];
            }
        });
    };

    const applyFilters = async () => {

        console.log("Filter categories: ", selectedCategories);
        console.log("Filter min price: ", selectedPriceRange.min_price);
        console.log("Filter max price: ", selectedPriceRange.max_price);
        const min_price = selectedPriceRange.min_price || 0
        const max_price = selectedPriceRange.max_price || 1000000

        try {
            setLoading(true)
            console.info("here2");
            const categoryQuery = selectedCategories.map(cat => `main_categories=${encodeURIComponent(cat)}`).join('&')

            let url = `${endpoints['search-food']}?min_price=${min_price}&max_price=${max_price}&${categoryQuery}`
            console.info("URL", url);

            let res = await APIs.get(url)


            console.info("API Response:", res.data);
            nav.navigate('SearchedScreen', { foods: res.data })
            setResult(res.data);


        } catch (error) {
            console.info(error)
        } finally {
            setLoading(false)
        }



    };
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            <View style={{ flex: 1, backgroundColor: '#ccc' }}>

                <TouchableOpacity style={CustomerStyles.filterButton}
                    onPress={() => bottomSheetRef.current.expand()}
                >
                    <Text style={{
                        fontSize: 16,
                        color: '#fff',
                    }}>Bộ lọc</Text>
                </TouchableOpacity>


                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                >
                    <BottomSheetView >
                        <View>
                            <Text style={CustomerStyles.sectionTitle}>Khoảng giá</Text>
                            <View style={CustomerStyles.optionsContainer}>
                                {priceRanges2.map((range, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            CustomerStyles.option,
                                            selectedPriceRange.name === range.name && CustomerStyles.optionSelected
                                        ]}
                                        onPress={() => setSelectedPriceRange(range)}
                                    >
                                        <Text
                                            style={
                                                selectedPriceRange.name === range.name
                                                    ? CustomerStyles.optionTextSelected
                                                    : CustomerStyles.optionText
                                            }
                                        >
                                            {range.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={CustomerStyles.sectionTitle}>Danh mục</Text>
                            <View style={CustomerStyles.optionsContainer}>
                                {categories.map((category, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            CustomerStyles.option,
                                            selectedCategories.includes(category) && CustomerStyles.optionSelected
                                        ]}
                                        onPress={() => toggleCategory(category)}
                                    >
                                        <Text
                                            style={
                                                selectedCategories.includes(category)
                                                    ? CustomerStyles.optionTextSelected
                                                    : CustomerStyles.optionText
                                            }
                                        >
                                            {category}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        <TouchableOpacity style={CustomerStyles.logoutButton} onPress={applyFilters}>
                            <Text style={CustomerStyles.logoutText}>Áp dụng</Text>
                        </TouchableOpacity>
                    </BottomSheetView>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    )
}

export default SearchScreen

