import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        justifyContent: "center", // Căn giữa theo trục chính, mặc định là chiều dọc
        alignItems: 'center',  // Căn giữa theo trục phụ, mặc định chiều ngang
        padding: 20,
    },
    RegisterInput: {
        width: "100%",
        marginBottom: 20,
        backgroundColor: "#fff",
    },
    RegisterButton: {
        flexDirection: 'row',
        backgroundColor: "#FF5722",
        paddingVertical: 15,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
        justifyContent: 'center'
    },
    AvatarButton: {
        backgroundColor: "#1976D2",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 20,
        alignItems: "center",
    },
    AvatarButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    AvatarPreview: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#1976D2",
        marginTop: 10,
    },
    ChooseImageButton: {
        backgroundColor: "#E0E0E0", // Màu nền
        paddingVertical: 10, // Khoảng cách trên dưới
        paddingHorizontal: 20, // Khoảng cách trái phải
        borderRadius: 5, // Bo góc
        borderWidth: 1, // Độ dày viền
        borderColor: "#BDBDBD", // Màu viền
        alignItems: "center", // Căn giữa nội dung theo trục ngang
        marginBottom: 10, // Khoảng cách dưới
    },
    ChooseImageText: {
        color: "#000", // Màu chữ
        fontSize: 16, // Kích thước chữ
    },
})