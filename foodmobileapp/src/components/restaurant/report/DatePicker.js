import { View, Text, TouchableOpacity } from "react-native";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");
import RestaurantStyles from "../../../styles/RestaurantStyles";

const DatePicker = ({ selectedDate, handlePrevDay, handleNextDay, openChooseTable }) => {
    return (
        <View style={RestaurantStyles.datePickerContainer}>
            <TouchableOpacity onPress={handlePrevDay} >
                <Text style={{ fontSize: 22, marginLeft: 10 }}>◀</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={openChooseTable}>
                <Text style={{ fontSize: 18 }}>{selectedDate.format("dddd, DD/MM/YYYY")}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleNextDay} >
                <Text style={{ fontSize: 22, marginRight: 10 }}>▶</Text>
            </TouchableOpacity>
        </View>
    );
};
export default DatePicker;