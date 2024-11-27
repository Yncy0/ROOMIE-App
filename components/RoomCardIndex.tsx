import { Image } from "expo-image";
import { View, Dimensions } from "react-native";


type Props = {
    items: any
}

const {width} = Dimensions.get('screen');

export default function RooomCardIndex({ items }: Props) {
    return (
        <View 
            style={{
                width: width,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Image 
                source={items.room_image}
                style={{
                    width: 230,
                    height: 290,
                    borderRadius: 10
                }}
            >

            </Image>
        </View>
    );
}