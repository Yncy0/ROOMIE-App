import { Dimensions, Text, View } from "react-native";
import { Image, type ImageSource } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { IconText } from "./IconText";


type Props = {
    items: any,
}

const {width} = Dimensions.get('screen');

export default function BookedCard({ items }: Props) {
    return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#2B32B2',
                    borderRadius: 10,
                    gap: 20,
                    paddingHorizontal: 15,
                    height: 150,
                }}
            >
                <Image 
                    source={items.room_image}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 10
                    }}
                />
                <View style={{gap:5}}>
                    <Text style={{color:'#fff'}}>{items.room_name}</Text>
                    <Text style={{color:'#fff'}}>{items.room_category}</Text>
                    <IconText icon='albums-outline' text={items.subject}/>
                    <IconText icon='people-outline' text={items.section}/>
                    <IconText icon='time-outline' text={items.schedule}/>
                </View>
            </View>
    )
}

