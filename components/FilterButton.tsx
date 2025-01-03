import { Ionicons } from "@expo/vector-icons"
import { Pressable } from "react-native"


type Props = {
    color: string
    onPress?: () => void,
}

export default function FilterButton({ color, onPress }: Props) {
    return (
        <Pressable
            style={{
                backgroundColor: color,
                flexDirection: "row",
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                width: 40,
                height: 40,
            }}
            onPress={onPress}
        >   
            <Ionicons 
                name={'filter'} 
                color="#fff" 
                size={24}
                style={{paddingRight: 1.9}}
            />
        </Pressable>
    )
}