import { Button, Pressable, Text, View } from "react-native"

//TO-DO: add onPress() later

type Props = {
    text: string
}

export default function PressableText({ text }: Props) {
    return (
        <Pressable
            style={({pressed}) => [
                {
                    backgroundColor: pressed ? '#D9D9D9' : 'white',
                },
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: 70,
                    paddingHorizontal: 20
                }
            ]}
        >
            <Text style={{ fontSize: 16, }}>{text}</Text>
            <Text style={{ fontSize: 20, }}>{'>'}</Text>
        </Pressable>
    )
}