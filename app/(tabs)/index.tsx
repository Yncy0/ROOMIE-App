import React from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";

import RoomCard from "@/components/cards/RoomCard";
import BookingsList from "@/components/lists/BookingsList";
import useFetchRooms from "@/hooks/queries/useFetchRooms";
import useThemeColor from "@/hooks/useThemeColor";

export default function Index() {
  const { data: rooms } = useFetchRooms();
  const { themeTextStyle, themeBackgroundStyle } = useThemeColor();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: themeBackgroundStyle.backgroundColor,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              minWidth: "100%",
              justifyContent: "space-between",
              paddingHorizontal: 15,
              paddingBottom: 20,
            }}
          >
            <Text style={themeTextStyle}>My Booking</Text>
            <Pressable>
              <Text>See all</Text>
            </Pressable>
          </View>
          <BookingsList />
          <View
            style={{
              flexDirection: "row",
              minWidth: "100%",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              paddingBottom: 20,
            }}
          >
            <Text style={themeTextStyle}>{"Available Rooms"}</Text>
            <Pressable>
              <Text>{"See more"}</Text>
            </Pressable>
          </View>
          <FlatList
            data={rooms}
            renderItem={({ item }) => (
              <RoomCard
                key={item.id}
                items={item}
                width={230}
                height={290}
                onPress={() =>
                  router.replace({
                    pathname: "/screens/roomPreview/[id]",
                    params: {
                      id: item.id,
                      roomName: item.room_name,
                      roomCategory: item.room_type,
                      roomImage: item.room_image,
                      customRoute: "/(tabs)",
                    },
                  })
                }
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 20, paddingHorizontal: 20 }}
            initialNumToRender={15}
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
