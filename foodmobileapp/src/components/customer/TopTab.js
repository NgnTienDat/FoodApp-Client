import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"




const topTab = createMaterialTopTabNavigator()

const TopTab = ({ tabs }) => {

    return (
        <topTab.Navigator
            screenOptions={{
                tabBarLabelStyle: {
                    fontWeight: 'bold',
                },
                tabBarIndicatorStyle: {
                    backgroundColor: '#EE4D2D', height: 3, borderRadius: 8
                },
                tabBarScrollEnabled: false,
            }}
        >

            {tabs.map((tab, index) => (
                <topTab.Screen key={index} name={tab.name}>
                    {tab.component}
                </topTab.Screen>
            ))}

        </topTab.Navigator>
    )
}

export default TopTab