import { ActivityIndicator, Alert, Button, Image, Text, TouchableOpacity, View } from "react-native"
import { TextInput } from "react-native-paper"
import CustomerStyles from "../../styles/CustomerStyles"
import { useNavigation } from "@react-navigation/native"
import { useContext, useState } from "react"
import APIs, { authApis, endpoints } from "../../config/APIs"
import QueryString from "qs"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { MyDispatchContext } from "../../config/UserContexts"
import * as ImagePicker from 'expo-image-picker';
import RegisterStyles from "../../styles/customer/RegisterStyles"

const RegisterScreen = () => {

    const nav = useNavigation()
    const [loading, setLoading] = useState(false)
    const dispatch = useContext(MyDispatchContext)
    const [avatar, setAvatar] = useState()
    const [user, setUser] = useState({
        'username': '',
        'password': ''
    })

    const users = {
        'email': {
            'title': 'Nhập địa chỉ email',
            'field': 'email',
            'secure': false,
        },
        'phone_number': {
            'title': 'Nhập số điện thoại',
            'field': 'phone_number',
            'secure': false,
        },
        'username': {
            'title': 'Nhập tên đăng nhập',
            'field': 'username',
            'secure': false,
        },
        'password': {
            'title': 'Nhập mật khẩu',
            'field': 'password',
            'secure': true,
        },
        'confirm_password': {
            'title': 'Xác nhân mật khẩu',
            'field': 'confirm_password',
            'secure': true,
        }
    }
    const updateUser = (value, field) => {
        setUser({ ...user, [field]: value })
    }


    const pickImage = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Permissions denied!");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled)
                setAvatar(result.assets[0])
        }
    }

    const register = async () => {
        try {
            setLoading(true)

            if (user.password !== user.confirm_password) {
                Alert.alert("Lỗi", "Mật khẩu và xác nhận mật khẩu không khớp!");
                return;
            }


            if (!user.email || !user.username || !user.password || !user.phone_number) {
                Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!");
                return;
            }

            // const form = new FormData()
            // for (let k in users)
            //     if (k !== 'confirm')
            //         form.append(k.field, users[k]);


            const form = new FormData()
            form.append("email", user.email)
            form.append("phone_number", user.phone_number)
            form.append("username", user.username)
            form.append("password", user.password)


            console.info(form);

            // if (avatar) {
            //     formData.append("avatar", {
            //         uri: avatar.uri,
            //         name: avatar.uri.split("/").pop(),
            //         type: "image/jpeg", // Hoặc image/png tùy theo ảnh
            //     });
            // }

            // form.append('avatar', {
            //     uri: avatar.uri,
            //     name: avatar.uri.split("/").pop(),
            //     type: "image/jpeg"
            // });


            const res = await APIs.post(endpoints['register'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })


            nav.navigate('LoginScreen')
        } catch (error) {
            if (error.response) {
                // Lỗi từ phía server (HTTP status)
                console.error("Response Error:", error.response.data);
            } else if (error.request) {
                // Không nhận được phản hồi từ server
                console.error("Request Error:", error.request);
            } else {
                // Lỗi khác
                console.error("Error:", error.message);
            }
        } finally {
            setLoading(false)
        }
    }

    // const register = async () => {
    //     try {
    //         setLoading(true);

    //         // Kiểm tra mật khẩu và xác nhận mật khẩu
    //         if (user.password !== user.confirm_password) {
    //             Alert.alert("Lỗi", "Mật khẩu và xác nhận mật khẩu không khớp!");
    //             return;
    //         }

    //         // Kiểm tra các trường bắt buộc
    //         if (!user.email || !user.username || !user.password || !user.phone_number) {
    //             Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!");
    //             return;
    //         }

    //         // Chuẩn bị dữ liệu để gửi
    //         const formData = new FormData();
    //         formData.append("email", user.email);
    //         formData.append("phone_number", user.phone_number);
    //         formData.append("username", user.username);
    //         formData.append("password", user.password);

    //         if (avatar) {
    //             formData.append("avatar", {
    //                 uri: avatar.uri,
    //                 name: avatar.uri.split("/").pop(),
    //                 type: "image/jpeg", // Hoặc image/png tùy theo ảnh
    //             });
    //         }

    //         // Gửi yêu cầu đến API đăng ký
    //         const res = await APIs.post(endpoints["register"], formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //             },
    //         });

    //         // Thông báo đăng ký thành công và điều hướng đến màn hình đăng nhập
    //         Alert.alert("Thành công", "Đăng ký tài khoản thành công!");
    //         nav.navigate("LoginScreen");
    //     } catch (error) {
    //         console.error(error);
    //         Alert.alert("Lỗi", "Đăng ký thất bại, vui lòng thử lại!");
    //     } finally {
    //         setLoading(false);
    //     }
    // };



    return (
        <View style={RegisterStyles.container}>

            {Object.values(users).map(u => <TextInput
                key={u.field}
                secureTextEntry={u.secure}
                mode="outlined"
                style={RegisterStyles.RegisterInput}
                placeholder={u.title}
                value={user[u.field]}
                onChangeText={t => updateUser(t, u.field)} />)}

            {/* <TouchableOpacity onPress={pickImage} style={RegisterStyles.ChooseImageButton}>
                <Text style={RegisterStyles.ChooseImageText}>
                    Chọn ảnh đại diện
                </Text>
            </TouchableOpacity>

            {avatar ? <Image source={{ uri: avatar.uri }}
                style={{ width: 100, height: 100, marginBottom:10 }} /> : ""} */}

            <TouchableOpacity onPress={register} loading={loading} style={RegisterStyles.RegisterButton}>
                {loading && <ActivityIndicator style={{ marginRight: 10 }} color="#fff" />}
                <Text style={CustomerStyles.logoutText}>Đăng ký</Text>
            </TouchableOpacity>



        </View>
    )
}
export default RegisterScreen


