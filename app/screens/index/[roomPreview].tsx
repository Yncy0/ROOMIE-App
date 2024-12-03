import { DATA } from "@/data/DATA";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Text, View, ImageBackground, ImageSourcePropType} from "react-native";
// import { ImageBackground } from "expo-image";


export default function RoomPreview() {
    const { 
        roomPreview , 
        roomName, 
        roomCategory,
        roomImage
    } = useLocalSearchParams<{roomPreview: string, roomName: string, roomCategory: string, roomImage: string}>();

    return (
        <View>
            <ImageBackground style={{height: 200, width: 200}} source={roomImage as ImageSourcePropType}>
                <Text>Hello: {roomPreview}</Text>
                <Text>{roomName}</Text>
                <Text>{roomCategory}</Text>
            </ImageBackground>
        </View>
    )
}