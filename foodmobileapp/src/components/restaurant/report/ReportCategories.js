import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");
import RestaurantStyles from "../../../styles/RestaurantStyles";
import DatePicker from "./DatePicker";
import ItemList from "./ItemList";
import ModalChoose from "./ModalChoose";

const dataCategories = [
    { id: 1, name: "Danh mục A", value: 100 },
    { id: 2, name: "Danh mục B", value: 80 },
    { id: 3, name: "Danh mục C", value: 50 },
    { id: 4, name: "Danh mục D", value: 30 },
    { id: 5, name: "Danh mục D", value: 30 },
    { id: 6, name: "Danh mục D", value: 30 },
    { id: 7, name: "Danh mục D", value: 30 },
    { id: 8, name: "Danh mục D", value: 30 },
];

const ReportCategories = ({ route }) => {
    const [selectedDate, setSelectedDate] = useState(moment());

    const handlePrevDay = () => {
        setSelectedDate(prevDate => moment(prevDate).subtract(1, 'days'));
    };

    const handleNextDay = () => {
        setSelectedDate(prevDate => moment(prevDate).add(1, 'days'));
    };

    const checkedValue = route.params?.checkedValue;

    // Sử dụng checkedValue để xử lý logic của bạn
    console.log('Checked Value in ReportCategories:', checkedValue);
    return (
        <View style={{ flex: 1, }}>
            {/* <DatePicker
                selectedDate={selectedDate}
                handlePrevDay={handlePrevDay}
                handleNextDay={handleNextDay}
                openChooseTable={openChooseTable}
            /> */}
            <View style={RestaurantStyles.chartContainer} >
                {/* List */}
                <Text style={{
                    fontSize: 20, margin: 10,
                }}>Doanh thu danh mục món ăn</Text>
                <ItemList
                    data={dataCategories}
                />
            </View>
        </View>
    );
};
export default ReportCategories;
