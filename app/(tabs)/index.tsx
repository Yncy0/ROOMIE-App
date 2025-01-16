import React from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { FlatList, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, View } from "@tamagui/core";
import { XStack } from "tamagui";

import BookedCard from "@/components/cards/BookedCard";
import RoomCard from "@/components/cards/RoomCard";
import { DATA } from "@/data/DATA";
import useFetchRooms from "@/hooks/queries/useFetchRooms";
import useFetchBookedRooms from "@/hooks/queries/useFetchBookedRooms";
import EmptyDisplay from "@/components/EmptyDisplay";

export default function Index() {
  const { data: rooms } = useFetchRooms();
  const { data: bookedRooms } = useFetchBookedRooms();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <XStack miw={"100%"} justifyContent={"space-between"} px={20} pb={20}>
            <Text>My Booking</Text>
            <Pressable>
              <Text>See all</Text>
            </Pressable>
          </XStack>
          {bookedRooms && bookedRooms.length > 0 ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 20,
                paddingHorizontal: 20,
                paddingBottom: 20,
              }}
              initialNumToRender={7}
              data={bookedRooms}
              renderItem={({ item, index }) => (
                <BookedCard items={item} key={index} />
              )}
            />
          ) : (
            <EmptyDisplay />
          )}
          <XStack miw={"100%"} justifyContent={"space-between"} px={20} pb={20}>
            <Text>{"Available Rooms"}</Text>
            <Pressable>
              <Text>{"See more"}</Text>
            </Pressable>
          </XStack>
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
