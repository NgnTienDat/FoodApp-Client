import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa", //
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  margin: {
    margin: 5,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    height: 100,
    paddingBottom: 20,
    paddingTop: 5,
  },
  tabBarIcon: {
    width: 35,
    height: 35,
  },
  tabBarLabel: {
    fontSize: 13,
    paddingBottom: 5,
  },
  container_home_header: {
    backgroundColor: '#EE4D2D', // Shopee orange color
    padding: 12,
    paddingTop: 50
  },
  container_account_header: {
    backgroundColor: '#EE4D2D', // Shopee orange color
    padding: 50,

  },
  addressContainer: {
    marginBottom: 8,

  },
  deliverText: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 4,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addressText: {
    color: '#fff',
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 20,
    height: 40,
    // marginHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1, borderRadius: 8,
    margin: 5
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#000',

  },
  safeArea: {
    // backgroundColor: '#EE4D2D',
  },

  menuContainer: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "white",
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: "#FF5722",
    margin: 5,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  mainCategoryImg: {
    width: 60,
    height: 60,
    backgroundColor: "#f1f1f1", //#f1f1f1 mau nay ne
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  itemMainCategories: {

    backgroundColor: '#f8f9fa', alignItems: 'center', marginRight: 25, height: 100
  },
  scrollMainCategories: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingVertical: 10,
    height: 1,
    marginBottom: 0,
    paddingHorizontal: 10
  },
  nearRestaurant: {
    paddingHorizontal: 15, fontSize: 24, fontWeight: "bold",
    paddingVertical: 3, marginVertical: 2, backgroundColor: "#f8f9fa", //#f8f9fa
  },
  listHeader: {
    height: 55, alignItems: 'center', justifyContent: 'center'
  },
  headerLine: {
    color: '#333', fontSize: 21, fontWeight: 'bold'
  },
  flatListNearRestaurant: {
    flexDirection: "row", padding: 10,
    borderRadius: 8, backgroundColor: '#fff', marginBottom: 10,
  },
  flatListNearRestaurantImage: {
    width: 100, height: 100, borderRadius: 5
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center', backgroundColor: '#EE4D2D', width: 150
  },

});