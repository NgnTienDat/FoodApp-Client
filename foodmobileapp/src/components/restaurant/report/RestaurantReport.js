import React, { useState, useEffect, useContext } from "react";
import { View, Text, SectionList } from "react-native";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");
import RestaurantStyles from "../../../styles/RestaurantStyles";
import ModalChoose from "./ModalChoose";
import { IconButton } from "react-native-paper";
import RestaurantAPIs, { endpoints } from "../../../config/RestaurantAPIs";
import { MyUserContext } from "../../../config/UserContexts";

const RestaurantReport = ({ navigation }) => {
    const user = useContext(MyUserContext);
    const restaurantId = user.restaurant_id;
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedReport, setSelectedReport] = useState({ typeReport: "food", timeReport: "day" });
    const [groupedData, setGroupedData] = useState([]);

    const openChooseTable = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    const handleConfirm = (checkedValue) => {
        setSelectedReport(checkedValue);
    };

    const groupDataByTime = (data, timeReport, isCategory = false) => {
        const groupedByTime = {};

        data.forEach((item) => {
            let timeKey;

            switch (timeReport) {
                case "day":
                    timeKey = moment(item.order_date).format("DD MMMM YYYY");
                    break;
                case "month":
                    timeKey = moment(item.order_date).format("MMMM YYYY");
                    break;
                case "period":
                    const quarter = moment(item.order_date).quarter();
                    timeKey = `Quý ${quarter} ${moment(item.order_date).format("YYYY")}`;
                    break;
                case "year":
                    timeKey = moment(item.order_date).format("YYYY");
                    break;
                default:
                    timeKey = "k xac dinh tg";
            }

            if (!groupedByTime[timeKey]) {
                groupedByTime[timeKey] = {};
            }

            const nameKey = isCategory ? item.food__category__name : item.food__name;

            if (groupedByTime[timeKey][nameKey]) {
                groupedByTime[timeKey][nameKey].total_sale += item.total_sale;
                groupedByTime[timeKey][nameKey].total_order += item.total_order;
            } else {
                groupedByTime[timeKey][nameKey] = {
                    food__name: nameKey,
                    total_sale: item.total_sale,
                    total_order: item.total_order,
                };
            }
        });

        return Object.keys(groupedByTime).map((timeKey) => ({
            title: timeKey,
            data: Object.values(groupedByTime[timeKey]),
        }));
    };

    const loadReport = async () => {
        if (selectedReport.typeReport === "food") {
            const res = await RestaurantAPIs.get(endpoints["foodReport"](restaurantId));
            const groupedData = groupDataByTime(res.data, selectedReport.timeReport);
            setGroupedData(groupedData);
        }
        if (selectedReport.typeReport === "category") {
            const res = await RestaurantAPIs.get(endpoints["categoryReport"](restaurantId));
            const groupedData = groupDataByTime(res.data, selectedReport.timeReport, true);
            setGroupedData(groupedData);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton
                    icon="filter"
                    size={22}
                    onPress={openChooseTable}
                />
            ),
        });
    }, [navigation]);

    useEffect(() => {
        loadReport();
    }, [restaurantId, selectedReport]);

    return (
        <View style={{ flex: 1 }}>
            <View style={RestaurantStyles.chartContainer}>
                <ModalChoose
                    modalVisible={modalVisible}
                    closeModal={closeModal}
                    onConfirm={handleConfirm}
                />
                <Text style={{ fontSize: 19, margin: 10, fontWeight: "bold" }}>
                    Thống kê {selectedReport.typeReport === 'food' ? 'món ăn' : 'danh mục'}{' '}
                    {selectedReport.timeReport === 'day' ? 'hôm nay' :
                        selectedReport.timeReport === 'month' ? 'theo tháng' :
                            selectedReport.timeReport === 'period' ? 'theo quý' : 'theo năm'}
                </Text>
                <SectionList
                    sections={groupedData}
                    keyExtractor={(item, index) => `${item.food__name}-${index}`}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10, marginLeft: 10 }}>
                            {title}
                        </Text>
                    )}
                    renderItem={({ item }) => (
                        <View style={RestaurantStyles.listItem}>
                            <Text style={RestaurantStyles.listItemText}>{item.food__name}</Text>
                            <Text style={RestaurantStyles.listItemValue}>
                                {item.total_sale.toLocaleString()} VNĐ ({item.total_order} đơn)
                            </Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

export default RestaurantReport;


// const groupedData = [
//     {
//         title: "Ngày 01 Tháng 01 Năm 2025", // Tên nhóm
//         data: [
//             { food__name: "Phở bò", total_sale: 500000, total_order: 10 },
//             { food__name: "Bánh mì", total_sale: 200000, total_order: 5 },
//         ],
//     },
//     {
//         title: "Ngày 02 Tháng 01 Năm 2025",
//         data: [
//             { food__name: "Cơm tấm", total_sale: 700000, total_order: 20 },
//         ],
//     },
// ];


// SectionList yêu cầu dữ liệu phải có cấu trúc như sau
// const sections = [
//     {
//         title: "Nhóm 1",
//         data: ["Mục 1", "Mục 2", "Mục 3"],
//     },
//     {
//         title: "Nhóm 2",
//         data: ["Mục 4", "Mục 5"],
//     },
// ];
