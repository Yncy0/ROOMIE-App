import { Ionicons } from "@expo/vector-icons"
import { Text, View } from "react-native"

{/* <a href="https://storyset.com/work">Work illustrations by Storyset</a> */}

type Props = {
    status: string,
    // numberOfStatus: number,
    color: string,
}

export default function HistoryStatus({ status, color }: Props) {
    return (
        <View
            style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center'
            }}
        >
            <Ionicons name={'ellipse-sharp'} color={color} size={16}/>
            <Text>{status}</Text>
        </View>
    )
}