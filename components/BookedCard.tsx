import { Text, View } from "react-native";
import { Image, type ImageSource } from "expo-image";


type Props = {
    imageSource: string,
    room_name: string
}

export default function BookedCard({ imageSource, room_name }: Props) {
    return (
        <View>
            <Image source={imageSource}/>
            <View>
                <Text>
                    {room_name}
                </Text>
            </View>
        </View>
    )
}