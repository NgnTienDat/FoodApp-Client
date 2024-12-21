import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApis, endpoints } from "./APIs"

const MyUserReducer = async (currentState, action) => {
    switch (action.type) {
        case 'login':
            const authTokenApi = await authApis()
            const currentUser = await authTokenApi.get(endpoints['current-user'])
            console.info(currentUser.data)
            return currentUser.data

        case 'logout':
            await AsyncStorage.removeItem('token')
            return null
    }
    return currentState
}

export default MyUserReducer