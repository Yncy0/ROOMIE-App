import OvalButton from "@/components/OvalButton";
import { DATA } from "@/data/DATA";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Text, View, ImageBackground, ImageSourcePropType, } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import { ImageBackground } from "expo-image";


export default function RoomPreview() {
    const { 
        roomName, 
        roomCategory,
        roomImage
    } = useLocalSearchParams<{roomName: string, roomCategory: string, roomImage: string}>();

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ImageBackground  
                    source={roomImage as ImageSourcePropType}
                    style={{
                        height: 310, 
                        padding: 20,
                        justifyContent: "flex-end",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row", 
                            justifyContent:'space-between', 
                            alignItems: 'center'
                        }}
                    >
                        <View>
                            <Text style={{color: 'white', fontSize: 20, fontWeight: '900'}}>{roomName}</Text>
                            <Text style={{color: 'white', fontSize: 14}}>{roomCategory}</Text>
                        </View>
                        <OvalButton text="Book Now" color="#2B32B2" height={40} width={183}/>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}