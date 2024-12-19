import { Button, Text, TouchableOpacity, View } from "react-native"
import { TextInput } from "react-native-paper"
import CustomerStyles from "../../styles/CustomerStyles"

const LoginScreen = () => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: "#f5f5f5",
            justifyContent: "center", // Căn giữa theo trục chính, mặc định là chiều dọc
            alignItems: 'center',  // Căn giữa theo trục phụ, mặc định chiều ngang
            padding: 20,
        }}>

            <TextInput style={CustomerStyles.loginInput}
                underlineColorAndroid="transparent"
                placeholder="Nhập tên đăng nhập"
                mode="outlined" />

            <TextInput style={CustomerStyles.loginInput}
                underlineColorAndroid="transparent"
                placeholder="Nhập mật khẩu"
                mode="outlined"
            />

            <TouchableOpacity style={CustomerStyles.loginButton}>
                <Text style={CustomerStyles.logoutText}>Đăng nhập</Text>
            </TouchableOpacity>
            <View style={{
                flexDirection:'row'
            }}>

                <TouchableOpacity>
                    <Text style={{color: "#1d5aff",}}>
                        Đăng ký tài khoản cá nhân / 
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{color: "#1d5aff",}}>
                        {"  "}Đăng ký tài khoản nhà hàng
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default LoginScreen


