// giả lập tạo đơn hàng để kiểm tra firebase và database có đồng bộ với nhau không
import { ref, push, update } from 'firebase/database';
import { database } from "../../../config/FirebaseConfig";