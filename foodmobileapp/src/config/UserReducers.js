import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApis, endpoints } from "./APIs"

const MyUserReducer = (currentState, action) => {
    switch (action.type) {
        case 'login':
            if (action.payload instanceof Promise) {
                console.error("Payload là Promise, cần xử lý trước khi dispatch.");
                return currentState;
              }
            return action.payload; 
        case 'logout':
            AsyncStorage.removeItem('token');
            console.info('Đã đăng xuất');
            return null;
        default:
            return currentState;
    }
};



export default MyUserReducer