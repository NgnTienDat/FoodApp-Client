import { ScrollView, View, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";

const ChartReport = ({ chartData }) => {
    return (
        <View>
            <Text style={{
                fontSize: 18, margin: 15,
                textAlign: "center",
            }}>Biểu đồ doanh thu trong tuần</Text>
            <ScrollView horizontal>
                <BarChart
                    data={chartData}
                    width={chartData.labels.length * 50} // Độ rộng dựa trên số lượng cột
                    height={220}
                    chartConfig={{
                        backgroundColor: "#f5f5f5",
                        backgroundGradientFrom: "#f5f5f5",
                        backgroundGradientTo: "#f5f5f5",
                        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        barPercentage: 0.5,
                    }}
                    style={{
                        borderRadius: 10,
                        marginBottom: 15,
                    }}
                />
            </ScrollView>
        </View>
    );
};

export default ChartReport;
