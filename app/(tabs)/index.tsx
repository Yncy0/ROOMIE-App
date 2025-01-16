import React from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { FlatList, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { Text } from "@tamagui/core";

import BookedCard from "@/components/cards/BookedCard";
import RoomCard from "@/components/cards/RoomCard";
import { DATA } from "@/data/DATA";
import useFetchRooms from "@/hooks/queries/useFetchRooms";
import { XStack } from "tamagui";

export default function Index() {
  const { data } = useFetchRooms();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <XStack miw={"100%"} jc={"space-between"} px={20} pb={20}>
            <Text>My Booking</Text>
            <Pressable>
              <Text>See all</Text>
            </Pressable>
          </XStack>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 20,
              paddingHorizontal: 20,
              paddingBottom: 20,
            }}
            initialNumToRender={7}
            data={DATA}
            renderItem={({ item, index }) => (
              <BookedCard items={item} key={index} />
            )}
          />
          <XStack miw={"100%"} jc={"space-between"} px={20} pb={20}>
            <Text>{"Available Rooms"}</Text>
            <Pressable>
              <Text>{"See more"}</Text>
            </Pressable>
          </XStack>
          <FlatList
            data={data}
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
