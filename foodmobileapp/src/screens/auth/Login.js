import { ActivityIndicator, Alert, Button, Text, TouchableOpacity, View } from "react-native"
import { TextInput } from "react-native-paper"
import CustomerStyles from "../../styles/CustomerStyles"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import APIs, { authApis, endpoints } from "../../config/APIs"
import QueryString from "qs"
import AsyncStorage from "@react-native-async-storage/async-storage"

const LoginScreen = () => {
    const nav = useNavigation()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        'username': '',
        'password': ''
    })

    const users = {
        'username': {
            'title': 'Nhập tên đăng nhập',
            'field': 'username',
            'secure': false,
           
        },
        'password': {
            'title': 'Nhập mật khẩu',
            'field': 'password',
            'secure': true,
            
        }
    }

    const updateUser = (value, field) => {
        setUser({ ...user, [field]: value })
    }

    const login = async () => {
        try {
            setLoading(true)
            // dùng qs.stringify để mã hóa data từ object thành dạng application/x-www-form-urlencoded
            // vì làm giống thầy nó trả về 400 bad request là gửi dạng JSON
            const loginData = QueryString.stringify({
                'client_id': 'QvhI26LJ0bwHurLgrMoEYRy5OPeMrMLbmGLtZxGE',
                'client_secret': 'Muy7Hq81uX5ElvZTT3zMr84CkzreJ4qXZsiTc7OYYwMCrNAL6UxZTeztJRri2mGxihlT2yDaqX9ZDpCbmx2FBkKBTWEwJ0dZzOeGaxSKG001yxXpodHBpXwk6DvVVmCY',
                'grant_type': 'password',
                ...user
            })

            let res = await APIs.post(endpoints['login'], loginData, {
                // cho server biết dữ liệu trong body được mã hóa theo chuẩn x-www-form-urlencoded.
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            console.info(res.data)

            await AsyncStorage.setItem('token', res.data.access_token)

            // const authTokenApi = await authApis()
            
            // const currentUser = await authTokenApi.get(endpoints['current-user'])
            // console.info('TOKEN:')
            // console.info(currentUser.data)

        } catch (ex) {
            console.error(ex)
        } finally {
            setLoading(false)
        }
    }


    return (

        <View style={{
            flex: 1,
            backgroundColor: "#f5f5f5",
            justifyContent: "center", // Căn giữa theo trục chính, mặc định là chiều dọc
            alignItems: 'center',  // Căn giữa theo trục phụ, mặc định chiều ngang
            padding: 20,
        }}>

            {Object.values(users).map(u => <TextInput 
                key={u.field}
                secureTextEntry={u.secure}
                style={CustomerStyles.loginInput}
                placeholder={u.title}
                value={user[u.field]}
                onChangeText={t => updateUser(t, u.field)} />)}

            {/* <TextInput style={CustomerStyles.loginInput}
                underlineColorAndroid="transparent"
                placeholder="Nhập tên đăng nhập"
                mode="outlined" value={user.username}
                onChangeText={t => updateUser(t, 'username')}
            />

            <TextInput style={CustomerStyles.loginInput}
                underlineColorAndroid="transparent"
                placeholder="Nhập mật khẩu"
                mode="outlined"
                secureTextEntry={true}
                value={user.password}
                onChangeText={t => updateUser(t, 'password')}
            /> */}

            <TouchableOpacity onPress={login} loading={loading} style={CustomerStyles.loginButton}>
                {loading && <ActivityIndicator style={{ marginRight: 10 }} color="#fff" />}
                <Text style={CustomerStyles.logoutText}>Đăng nhập</Text>
            </TouchableOpacity>

            <View style={{
                flexDirection: 'row'
            }}>

                <TouchableOpacity onPress={() => nav.navigate('RegisterScreen')}>
                    <Text style={{ color: "#1d5aff", }}>
                        Đăng ký tài khoản cá nhân /
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => nav.navigate('RestaurantRegisterScreen')}>
                    <Text style={{ color: "#1d5aff", }}>
                        {"  "}Đăng ký tài khoản nhà hàng
                    </Text>
                </TouchableOpacity>
            </View>

        </View>

    )
}
export default LoginScreen


