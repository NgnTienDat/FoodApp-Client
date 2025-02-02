import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native"
import { Icon } from "react-native-paper"

const BackButton = () => {

    const nav = useNavigation()

    return (
        <TouchableOpacity style={{
            top: 50,
            left: 10,
            padding: 8,
            backgroundColor: '#a49d997d',
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            position: 'absolute'

        }} onPress={() => nav.goBack()}>
            <Icon source="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
    )
}

export default BackButton