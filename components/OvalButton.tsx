import { Pressable, Text } from "react-native"


type Props = {
    text: string, 
    color: string,
    height: number,
    width: number,
    onPress?: () => void,
}

export default function OvalButton({ text, color, height, width, onPress }: Props) {
    return (
        <Pressable
            onPress={onPress}
            style={{ 
                backgroundColor: color,
                alignItems: 'center',
                justifyContent: 'center',
                width: width,
                height: height,
                borderRadius: 60
            }}
        >
            <Text 
                style={{
                    fontSize: 16, 
                    fontWeight: '600', 
                    color: 'white',
                }}
                >{text}
            </Text>
        </Pressable>
    )
}