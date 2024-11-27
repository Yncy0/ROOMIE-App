import { Image, Text, View } from "react-native";

type Props = {
    image: string,
    room_name: string
}

export default function BookedCard({ image, room_name }: Props) {
    return (
        <View>
            <Image source={{uri: image}}/>
            <View>
                <Text>
                    {room_name}
                </Text>
            </View>
        </View>
    )
}