import { Ionicons } from "@expo/vector-icons"
import { Text, View } from "react-native"

type Props = {
    icon: any,
    text: string
}

export const IconText = ({ icon, text }: Props) => {
    return (
    <View 
        style={{
            flexDirection: 'row',
            alignItems: "center",
            gap: 5
            }}
        >
        <Ionicons name={icon} size={14} color={'#fff'}/>
        <Text style={{color: '#fff'}}>
            {text}
        </Text>
    </View>
    )
}