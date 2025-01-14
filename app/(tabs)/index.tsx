import React from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { FlatList, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { View, Text } from "@tamagui/core";

import Searchbar from "@/components/Searchbar";
import FilterButton from "@/components/buttons/FilterButton";
import BookedCard from "@/components/cards/BookedCard";
import RoomCard from "@/components/cards/RoomCard";
import { DATA } from "@/data/DATA";
import useFetchRooms from "@/hooks/useFetchRooms";

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
          <View
            fd={"row"}
            jc={"space-between"}
            ai={"center"}
            miw={"100%"}
            px={20}
            pb={10}
          >
            <Searchbar placeholder="Search" />
            <FilterButton color="#2B32B2" />
          </View>
          <View miw={"100%"} fd={"row"} jc={"space-between"} px={20} pb={20}>
            <Text>My Booking</Text>
            <Pressable>
              <Text>See all</Text>
            </Pressable>
          </View>
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
          <View miw={"100%"} fd={"row"} jc={"space-between"} px={20} pb={20}>
            <Text>{"Available Rooms"}</Text>
            <Pressable>
              <Text>{"See more"}</Text>
            </Pressable>
          </View>
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
