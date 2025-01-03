//import { Image } from "expo-image";
import { View, Dimensions, Text, Pressable } from "react-native";
import { ImageBackground } from "expo-image";
import { supabase } from "@/utils/supabase";
import React from "react";
import { Session } from "@supabase/supabase-js";


type Props = {
    items: any,
    onPress? : () => void, 
}

const {width} = Dimensions.get('screen');

export default function RoomCard({ items, onPress }: Props) {

    return (
        <Pressable onPress={onPress}>
            <ImageBackground 
            source={{uri: items.room_image}}
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
                }}>{items.room_type}
            </Text>
        </ImageBackground>            
        </Pressable>
    );
}