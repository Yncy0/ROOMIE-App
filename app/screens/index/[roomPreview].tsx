import BackButton from "@/components/BackButton";
import BookingModal from "@/components/BookingModal";
import OvalButton from "@/components/OvalButton";
import { DATA } from "@/data/DATA";
import { router, Stack, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import moment from "moment";
import React from "react";
import { Text, View, ImageBackground, ImageSourcePropType, ScrollView, } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import { ImageBackground } from "expo-image";


export default function RoomPreview() {
    const { 
        roomName, 
        roomCategory,
        roomImage
    } = useLocalSearchParams<{roomName: string, roomCategory: string, roomImage: string}>();

    const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}}>
                <Stack.Screen options={{headerShown: false}} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ImageBackground  
                        source={roomImage as ImageSourcePropType}
                        style={{
                            height: 275, 
                            padding: 20,
                            justifyContent: "space-between",
                        }}
                    >
                        <BackButton onPress={() => router.replace("/(tabs)")}/>
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
                            <OvalButton 
                                text="Book Now" 
                                color="#2B32B2" 
                                height={40} 
                                width={183}
                                onPress={() => {setIsModalVisible(true)}}
                            />
                        </View>
                    </ImageBackground>
                    <View style={{padding: 20, gap: 20, }}>
                        <Text>DESCRIPTION</Text>
                        <Text style={{borderBottomColor: "#2B32B2", borderBottomWidth: 1, paddingBottom: 10}}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Sequi soluta aliquid consequuntur dolorum modi nesciunt dignissimos quas mollitia aspernatur aut. 
                            Possimus veniam repudiandae exercitationem ipsa reprehenderit sequi architecto molestiae repellat!
                        </Text>
                        <Text>Today's Booking</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center' ,justifyContent: 'space-between', }}>
                            <Text>Today</Text>
                            <Text>{moment().format('dddd, DD, MMM YYYY')}</Text>
                        </View>
                    </View>
                    <BookingModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}/>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}