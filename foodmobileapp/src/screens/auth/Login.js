import { ActivityIndicator, Alert, Button, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import CustomerStyles from "../../styles/CustomerStyles";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import APIs, { authApis, endpoints } from "../../config/APIs";
import QueryString from "qs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyDispatchContext } from "../../config/UserContexts";

const LoginScreen = () => {
    const nav = useNavigation();
    const [loading, setLoading] = useState(false);
    const dispatch = useContext(MyDispatchContext);
    const [user, setUser] = useState({
        'username': '',
        'password': ''
    });

    const [errors, setErrors] = useState({
        'username': '',
        'password': ''
    });

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
    };

    const updateUser = (value, field) => {
        setUser({ ...user, [field]: value });
        setErrors({ ...errors, [field]: '' }); // Xóa lỗi khi nhập lại
    };

    const login = async () => {
        try {
            setLoading(true);
            setErrors({ username: '', password: '' }); // Reset lỗi trước khi gửi request

            const loginData = QueryString.stringify({
                'client_id': 'QvhI26LJ0bwHurLgrMoEYRy5OPeMrMLbmGLtZxGE',
                'client_secret': 'Muy7Hq81uX5ElvZTT3zMr84CkzreJ4qXZsiTc7OYYwMCrNAL6UxZTeztJRri2mGxihlT2yDaqX9ZDpCbmx2FBkKBTWEwJ0dZzOeGaxSKG001yxXpodHBpXwk6DvVVmCY',
                'grant_type': 'password',
                ...user
            });

            const res = await APIs.post(endpoints['login'], loginData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            await AsyncStorage.setItem('token', res.data.access_token);

            const authTokenApi = await authApis();
            const currentUser = await authTokenApi.get(endpoints['current-user']);
            const resolvedData = currentUser.data;

            dispatch({ 'type': 'login', 'payload': resolvedData });
            console.log('user: ', resolvedData)

            if (resolvedData && resolvedData.role) {
                if (resolvedData.role === "customer") {
                    nav.navigate('MainTabs');
                } else if (resolvedData.role === "restaurant-user") {
                    if (resolvedData.confirm_status === false)
                        Alert.alert("Thông báo", "Tài khoản nhà hàng của bạn đang trờ xác nhận!");
                    else 
                        nav.navigate('MyRestaurant');
                } else if (resolvedData.role === "admin") {
                    Alert.alert("Thông báo", "Bạn không có quyền truy cập vào ứng dụng này!");
                } else {
                    Alert.alert("Thông báo", "Vai trò không hợp lệ!");
                }
            } else {
                Alert.alert("Thông báo", "Bạn không có quyền truy cập vào ứng dụng này!");
            }
            

        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                // Nếu server trả về lỗi 400, hiển thị lỗi lên input
                setErrors({
                    username: "Tên đăng nhập hoặc mật khẩu không chính xác!",
                    password: "Tên đăng nhập hoặc mật khẩu không chính xác!"
                });
            } else {
                console.error(ex);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{
            flex: 1,
            backgroundColor: "#f5f5f5",
            justifyContent: "center",
            alignItems: 'center',
            padding: 20,
            position: 'relative'
        }}>
            <TouchableOpacity style={{ position: 'absolute', zIndex: 1, bottom: 70, }}
                onPress={() => nav.navigate('MainTabs')}
            >
                <Text style={{ color: "#1d5aff" }}>Đi tới trang chủ</Text>
            </TouchableOpacity>

            {
                Object.values(users).map(u => (
                    <View key={u.field} style={{ width: '100%', marginBottom: 10 }}>
                        <TextInput
                            secureTextEntry={u.secure}
                            mode="outlined"
                            style={CustomerStyles.loginInput}
                            placeholder={u.title}
                            value={user[u.field]}
                            onChangeText={t => updateUser(t, u.field)}
                            error={!!errors[u.field]} // bao loi
                            // error={true}
                        />
                        {errors[u.field] ? <Text style={{ color: 'red', fontSize: 12 }}>{errors[u.field]}</Text> : null}
                    </View>
                ))
            }

            <TouchableOpacity onPress={login} style={CustomerStyles.loginButton}>
                {loading && <ActivityIndicator style={{ marginRight: 10 }} color="#fff" />}
                <Text style={CustomerStyles.logoutText}>Đăng nhập</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => nav.navigate('RegisterScreen')}>
                    <Text style={{ color: "#1d5aff" }}>Đăng ký tài khoản cá nhân /</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => nav.navigate('RestaurantRegisterScreen')}>
                    <Text style={{ color: "#1d5aff" }}>{"  "}Đăng ký tài khoản nhà hàng</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;
