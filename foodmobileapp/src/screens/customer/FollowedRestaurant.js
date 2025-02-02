import { ActivityIndicator, Button, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import CustomerStyles from "../../styles/CustomerStyles"
import { Icon } from "react-native-paper"
import CartIcon from "../../components/customer/Cart"
import { useContext, useEffect, useState } from "react"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { MyUserContext } from "../../config/UserContexts"
import RestaurantItem from "../../components/customer/RestaurantItem"
import { authApis, endpoints } from "../../config/APIs"



const FollowedRestaurant = () => {
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(false);
    const nav = useNavigation()
    const user = useContext(MyUserContext)
    const isFocused = useIsFocused()

    

    const loadRestaurants = async () => {
        try {
            if (!user) {
                console.log("Chua dang nhap");
                nav.navigate('LoginScreen');
                return;
            }


            setLoading(true)
            const authTokenApi = await authApis()
            const response = await authTokenApi.get(endpoints['followed-restaurant'])
            console.log('followed res: ', response.data)
            setRestaurants(response.data)

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {

        if (isFocused) {
            loadRestaurants()
        }
    }, [isFocused])


    return (
        <SafeAreaView>
            <View style={{position: 'relative'}}>
               
            {loading && <ActivityIndicator size="large" color="#EE4D2D" style={{ position: 'absolute', top: 270, left: 200 }} />}

                <FlatList

                    data={restaurants}
                    
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) =>

                        <RestaurantItem item={item} routeName="RestaurantScreen" params={{ "RestaurantId": item.id }} />
                    }
                    


                />


            </View>

        </SafeAreaView>


    )
}

export default FollowedRestaurant