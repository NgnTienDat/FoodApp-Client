import { ActivityIndicator, Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { HelperText, TextInput } from "react-native-paper"
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

        if (!validateForm()) {
            return
        }

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

            const form = new FormData()
            form.append("email", user.email)
            form.append("phone_number", user.phone_number)
            form.append("username", user.username)
            form.append("password", user.password)


            console.info(form);

            if (avatar) {
                form.append("avatar", {
                    uri: avatar.uri,
                    name: avatar.uri.split("/").pop(),
                    type: "image/jpeg", // Hoặc image/png tùy theo ảnh
                });
            }

            form.append('avatar', {
                uri: avatar.uri,
                name: avatar.uri.split("/").pop(),
                type: "image/jpeg"
            });


            const res = await APIs.post(endpoints['register'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            Alert.alert("Thành công", "Đăng ký tài khoản thành công!")
            nav.navigate('LoginScreen')
        } catch (error) {
            console.error("Error:", error)
        } finally {
            setLoading(false)
        }
    }
    const [errors, setErrors] = useState({});
    const hasError = (field) => {
        if (!user[field]) return "Trường này không được để trống!";

        if (field === "email" && !/\S+@\S+\.\S+/.test(user.email)) return "Email không hợp lệ!";

        if (field === "phone_number" && !/^\d{10,11}$/.test(user.phone_number)) return "Số điện thoại không hợp lệ!";

        if (field === "password" && user.password.length < 3) return "Mật khẩu phải có ít nhất 3 ký tự!";

        if (field === "confirm_password" && user.confirm_password !== user.password) return "Mật khẩu không khớp!";

        return null;
    }
    const validateForm = () => {
        let newErrors = {}

        if (!user.email) newErrors.email = "Trường này không được để trống!"
        else if (!/\S+@\S+\.\S+/.test(user.email)) newErrors.email = "Email không hợp lệ!"

        if (!user.phone_number) newErrors.phone_number = "Trường này không được để trống!"
        else if (!/^\d{10}$/.test(user.phone_number)) newErrors.phone_number = "Số điện thoại không hợp lệ!"

        if (!user.username) newErrors.username = "Trường này không được để trống!"

        if (!user.password) newErrors.password = "Trường này không được để trống!"
        else if (user.password.length < 3) newErrors.password = "Mật khẩu phải có ít nhất 3 ký tự!"

        if (!user.confirm_password) newErrors.confirm_password = "Trường này không được để trống!"
        else if (user.confirm_password !== user.password) newErrors.confirm_password = "Mật khẩu không khớp!"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    return (
        <View style={RegisterStyles.container}>

            {Object.values(users).map(u =>
                <View key={u.field} style={{ width: '100%' }}>

                    <TextInput
                        label={u.title}
                        secureTextEntry={u.secure}
                        mode="outlined"
                        style={RegisterStyles.RegisterInput}
                        placeholder={u.title}
                        value={user[u.field]}
                        onChangeText={t => updateUser(t, u.field)} />

                    <HelperText type="error" visible={!!errors[u.field]}>
                        {errors[u.field]}
                    </HelperText>
                </View>
            )
            }
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <TouchableOpacity onPress={pickImage} style={RegisterStyles.ChooseImageButton}>
                    <Text style={RegisterStyles.ChooseImageText}>{avatar ? 'Đổi ảnh đại diện' : 'Chọn ảnh đại diện'}</Text>
                </TouchableOpacity>

                {avatar && (
                    <Image source={{ uri: avatar.uri }} style={RegisterStyles.AvatarPreview} />
                )}
            </View>


            <TouchableOpacity onPress={register} loading={loading} style={RegisterStyles.RegisterButton}>
                {loading && <ActivityIndicator style={{ marginRight: 10 }} color="#fff" />}
                <Text style={CustomerStyles.logoutText}>Đăng ký</Text>
            </TouchableOpacity>



        </View>
    )
}
export default RegisterScreen
const styles = StyleSheet.create({

})

