import { Dimensions, Text, View } from "react-native";
import { Image, type ImageSource } from "expo-image";


type Props = {
    items: any,
}

const {width} = Dimensions.get('screen');

export default function BookedCard({ items }: Props) {
    return (
        <View
            style={{
                width: width,
                alignItems: "center",
                paddingHorizontal: 20
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#2B32B2',
                    borderRadius: 10,
                    gap: 20,
                    height: 130,
                    width: '100%',
                    paddingInline: 15
                }}
            >
                <Image 
                    source={items.room_image}
                    style={{
                        width: 100,
                        height: 100,
                    }}
                />
                <View>
                    <Text style={{color: '#fff'}}>
                        {items.room_name}
                    </Text>
                </View>
            </View>
        </View>
    )
}