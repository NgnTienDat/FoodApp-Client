import { useContext, useEffect, useState } from "react"
import APIs, { authApis, endpoints } from "../../config/APIs"
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { HomeHeader, MainCategory } from "../../components/customer/HomeHeader"
import CustomerStyles from "../../styles/CustomerStyles"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import RestaurantItem from "../../components/customer/RestaurantItem"
import CartIcon from "../../components/customer/Cart"
import { MyUserContext } from "../../config/UserContexts"



const HomeScreen = () => {

    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const nav = useNavigation()
    const user = useContext(MyUserContext)
    const [cart, setCart] = useState(null)
    const [cartItemNumbers, setCartItemNumbers] = useState(0)
    const isFocused = useIsFocused()


    const getMyCart = async () => {
        try {
            if (!user) {
                return
            }
            const authTokenApi = await authApis()
            const myCart = await authTokenApi.get(endpoints['my-cart'])


            console.info('MY CART: ', myCart.data)

            setCartItemNumbers(myCart.data.items_number, 0)
            setCart(myCart.data)

        } catch (error) {
            console.info(error)
            setCartItemNumbers(0)
        }
    }
    useEffect(() => {
        if (isFocused) {     
            getMyCart();
        }
    }, [isFocused]);


    const loadRestaurants = async () => {
        try {
            if (page > 0) {
                let url = `${endpoints['restaurants']}?page=${page}` // lấy url nhà hàng kèm trang
                setLoading(true)
                let res = await APIs.get(url) // gọi api lấy danh sách nhà hàng
                if (page > 1) // nếu page > 1 nghĩa là chuyển trang thì 
                    // nạp danh sách từ trang mới gộp với danh sách từ trang trước. Nghĩa là không đè lên ds hiện tại
                    setRestaurants(current_res => [...current_res, ...res.data.results])
                else
                    setRestaurants(res.data.results)

                if (res.data.next === null)
                    setPage(0);
            }

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {

        loadRestaurants()
    }, [page])

    const loadMore = () => {
        if (page > 0 && !loading)
            setPage(page + 1);
    }
    return (

        <View style={CustomerStyles.container}>   
            <HomeHeader />
            {user && cart &&
                <TouchableOpacity style={CustomerStyles.cartPosition} onPress={() => nav.navigate('CartScreen', {'cartId': cart.id})}>
                    <CartIcon itemNumbers={cartItemNumbers} />
                </TouchableOpacity>
            }


            <FlatList
                ListHeaderComponent={MainCategory}
                data={restaurants}
                onEndReached={loadMore}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>

                    <RestaurantItem item={item} routeName="RestaurantScreen" params={{ "RestaurantId": item.id }} />
                }
                refreshing={loading}
                onRefresh={loadRestaurants}

            />




        </View>


    )
}


export default HomeScreen;