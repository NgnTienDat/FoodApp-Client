import { StyleSheet } from "react-native";

export default StyleSheet.create({
    subject: {
        fontSize: 20,
        margin: 10,
        textAlign: "center",
        fontWeight: 'bold'
    },
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    header: { flexDirection: 'row', padding: 16, backgroundColor: '#EE4D2D' },
    storeImage: { width: 70, height: 70, borderRadius: 40, marginRight: 16, backgroundColor: 'white' },
    storeInfo: { flex: 1 },
    storeName: { fontSize: 18, fontWeight: 'bold', color: 'white' },
    storeDetails: { fontSize: 14, color: 'white' },
    switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff', marginVertical: 8 },
    switchLabel: { fontSize: 16 },
    menuOptions: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', paddingVertical: 16 },
    menuItem: { alignItems: 'center' },
    iconText: { fontSize: 16, margin: 5 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', padding: 16 },
    dishList: { paddingHorizontal: 16 },
    dishCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, backgroundColor: '#fff', padding: 8, borderRadius: 8 },
    dishImage: { width: 90, height: 90, borderRadius: 10, marginRight: 16, backgroundColor: 'grey' },
    dishName: { fontSize: 17, },
    headerProfile: {
        padding: 20,
        backgroundColor: '#EE4D2D',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
        backgroundColor: 'white'
    },
    rating: {
        fontSize: 17,
        color: 'white',
        marginVertical: 5,
    },
    phone: {
        fontSize: 17,
        color: 'white',
    },
    infoText: {
        fontSize: 17,
        color: 'white',
        marginBottom: 10,
    },
    incomeNumber: {
        fontSize: 17,
        textAlign: "center",
    },
    oderName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    containerCardMenu: {
        flexDirection: 'row', alignItems: 'center', marginBottom: 10, backgroundColor: '#fff', padding: 8, borderRadius: 8
    }, cardChoiceName: {
        fontSize: 16,
        margin: 10
    },
    addBtn: {
        backgroundColor: '#EE4D2D',
        margin: 10,
    },
    inputMargin: {
        margin: 10,
        borderColor: '#EE4D2D',
    },
    dropDownStyle: {
        margin: 5,
        paddingHorizontal: 5,

    },
    groupBtn: {
        flexDirection: 'row',
    },
    deleteBtn: {
        backgroundColor: 'red',
        margin: 10,
    },
    switchContainerCustom: { flexDirection: 'row', justifyContent: 'right', alignItems: 'center', padding: 8 },
    scrollViewStyle: {
        backgroundColor: 'white',
        margin: 10,
        height: 300
    },

});
