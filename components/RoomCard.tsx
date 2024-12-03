//import { Image } from "expo-image";
import { View, Dimensions, Text, ImageBackground, Pressable } from "react-native";


type Props = {
    items: any,
    onPress? : () => void, 
}

const {width} = Dimensions.get('screen');

export default function RooomCard({ items, onPress }: Props) {
    return (
        <Pressable onPress={onPress}>
            <ImageBackground 
                source={items.room_image}
                style={{
                    width: 230,
                    height: 290,
                    justifyContent: "flex-end",
                    padding: 10,
                }}
                imageStyle={{ borderRadius: 10 }}
            >
                <Text 
                    style={{
                        color:"#fff", 
                        bottom:0, 
                        left:0,
                        fontSize: 24,
                        fontWeight: '700'
                    }}>{items.room_name}
                </Text>
                <Text 
                    style={{
                        color:"#fff", 
                        bottom:0, 
                        left:0,
                        fontSize: 16
                    }}>{items.room_description}
                </Text>
            </ImageBackground>
        </Pressable>
    );
}