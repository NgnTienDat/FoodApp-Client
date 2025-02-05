import { Alert, Button, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native"
import CustomerStyles from "../../styles/CustomerStyles"
import { Icon } from "react-native-paper"
import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import APIs, { endpoints } from "../../config/APIs";
import { SearchContext } from "../../config/UserContexts";

const MySearchBar = () => {
    const nav = useNavigation()
    const [querySearch, setQuerySearch] = useState('')
    const { searchKeyWord, setSearchKeyWord, suggestions, setSuggestions } = useContext(SearchContext)
    // const [suggestions, setSuggestions] = useState([]);
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)

    const searchFood = async () => {
        console.info("here1");
        if (!searchKeyWord.trim()) return
        try {
            setLoading(true)

            let url = `${endpoints['search-food']}?name=${searchKeyWord}`
            console.info("URL", url);

            let res = await APIs.get(url)


            console.info("API Response:", res.data);
            console.info("QuerySEarch:", searchKeyWord);
            setSuggestions([])
            nav.navigate('SearchedScreen', { foods: res.data })
            setResult(res.data);


        } catch (error) {
            console.info(error)
        } finally {
            setLoading(false)
        }
    }

    const loadSuggestionsFood = async () => {

        try {
            let url = `${endpoints['search-food']}?name=${searchKeyWord}`
            console.info("URL", url);

            let res = await APIs.get(url)
            // setSuggestions(current_res => [...current_res, ...res.data])
            setSuggestions(res.data)
            console.log('suggestions: ', res.data)
            // if (page > 1)
            // else
            //     setFoods(res.data.results)

            // if (!res.data.next) {
            //     setPage(0);
            // }


        } catch (ex) {
            console.error('aaaaa' + ex);
        } finally {
            setLoading(false);
        }

    }

    const handleSearch = async (key) => {
        setSearchKeyWord(key)
        if (!key.trim()) return
        try {
            setLoading(true)

            let url = `${endpoints['search-food']}?name=${key}`
            console.info("URL", url);

            let res = await APIs.get(url)


            console.info("API Response:", res.data);
            console.info("QuerySEarch:", key);
            setSuggestions([])
            nav.navigate('SearchedScreen', { foods: res.data })
            setResult(res.data);


        } catch (error) {
            console.info(error)
        } finally {
            setLoading(false)
        }
        
    }

    useEffect(() => {
        let timer = setTimeout(() => loadSuggestionsFood(), 200);
        return () => clearTimeout(timer);
    }, [searchKeyWord])

    const search = (value, callback) => {
        // setPage(1);
        callback(value);
    }


    return (

        <View style={{ marginTop: 70 }}>
            <View style={CustomerStyles.searcherContainer}>
                <HeaderBackButton onPress={() => {nav.goBack(); setSearchKeyWord([])}} />
                <View style={CustomerStyles.searchBox}>
                    <Icon source="magnify" size={20} color="#666" />
                    <TextInput
                        style={CustomerStyles.searchText}
                        placeholder="Bánh Mì Chim Chay Giảm 50%"
                        placeholderTextColor="#999"
                        value={searchKeyWord}
                        onChangeText={t => search(t, setSearchKeyWord)}
                        onSubmitEditing={searchFood}
                    />

                </View>

                <TouchableOpacity style={CustomerStyles.cancelInput} onPress={() => console.log("hủy")}>
                    <Text style={{
                        fontSize: 16,
                        color: '#EE4D2D',
                    }}>Hủy</Text>
                </TouchableOpacity>

            </View>
            <FlatList
                contentContainerStyle={{marginTop: 10}}
                data={suggestions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=>handleSearch(item.restaurant)}
                        style={{ paddingHorizontal: 30,
                             paddingVertical: 10, 
                             borderBottomWidth: 1, 
                             borderBottomColor: '#fff' }}
                    >
                        <Text style={{ fontSize: 15 }}>{item.restaurant}</Text>
                    </TouchableOpacity>
                )}

            />
        </View>

    )
}

export default MySearchBar


export const SearchView = () => {

    const nav = useNavigation()
    const { searchKeyWord, setSearchKeyWord } = useContext(SearchContext)

  
    return (
        <View style={{ marginTop: 70, marginBottom: 5 }}>
            <View style={CustomerStyles.searcherContainer}>
                <HeaderBackButton onPress={() => nav.goBack()} />
                <TouchableOpacity style={CustomerStyles.searchBox} onPress={() => nav.goBack()}>
                    <Icon source="magnify" size={20} color="#666" />
                    
                    <Text style={CustomerStyles.searchText}>
                        {searchKeyWord}
                    </Text>

                </TouchableOpacity>

                

            </View>
        </View>
    )
}