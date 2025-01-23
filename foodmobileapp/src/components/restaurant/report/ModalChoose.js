import { View, Text, TouchableOpacity, Modal } from "react-native";
import RestaurantStyles from "../../../styles/RestaurantStyles";
import { RadioButton } from 'react-native-paper';
import React, { useState } from "react";

const ModalChoose = ({ modalVisible, closeModal, onConfirm }) => {
    const [typeReport, setTypeReport] = useState('food'); // Trạng thái cho loại báo cáo
    const [timeReport, setTimeReport] = useState('day'); // Trạng thái cho thời gian

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
        >
            <View style={RestaurantStyles.modalContainer}>
                <View style={RestaurantStyles.orderDetailContainer}>
                    <View>
                        {/*  Chọn loại báo cáo */}
                        <Text style={{ fontSize: 19, marginBottom: 7 }}>Thống kê</Text>
                        <View style={RestaurantStyles.listItem}>
                            <Text>Món ăn</Text>
                            <RadioButton
                                value="food"
                                status={typeReport === 'food' ? 'checked' : 'unchecked'}
                                onPress={() => setTypeReport('food')}
                            />
                        </View>
                        <View style={RestaurantStyles.listItem}>
                            <Text>Danh mục</Text>
                            <RadioButton
                                value="category"
                                status={typeReport === 'category' ? 'checked' : 'unchecked'}
                                onPress={() => setTypeReport('category')}
                            />
                        </View>

                        {/*Chọn thời gian */}
                        <Text style={{ fontSize: 19, marginBottom: 7, marginTop: 15 }}>Thời gian</Text>
                        <View style={RestaurantStyles.listItem}>
                            <Text>Theo ngày</Text>
                            <RadioButton
                                value="day"
                                status={timeReport === 'day' ? 'checked' : 'unchecked'}
                                onPress={() => setTimeReport('day')}
                            />
                        </View>
                        <View style={RestaurantStyles.listItem}>
                            <Text>Theo tháng</Text>
                            <RadioButton
                                value="month"
                                status={timeReport === 'month' ? 'checked' : 'unchecked'}
                                onPress={() => setTimeReport('month')}
                            />
                        </View>
                        <View style={RestaurantStyles.listItem}>
                            <Text>Theo quý (3 tháng)</Text>
                            <RadioButton
                                value="period"
                                status={timeReport === 'period' ? 'checked' : 'unchecked'}
                                onPress={() => setTimeReport('period')}
                            />
                        </View>
                        <View style={RestaurantStyles.listItem}>
                            <Text>Theo năm</Text>
                            <RadioButton
                                value="year"
                                status={timeReport === 'year' ? 'checked' : 'unchecked'}
                                onPress={() => setTimeReport('year')}
                            />
                        </View>
                    </View>

                    {/* Nút Xem */}
                    <View style={RestaurantStyles.footer}>
                        <TouchableOpacity
                            onPress={() => {
                                onConfirm({ typeReport, timeReport });
                                closeModal();
                            }}
                            style={RestaurantStyles.rejectBtn}
                        >
                            <Text style={RestaurantStyles.btnText}>Xem</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ModalChoose;
