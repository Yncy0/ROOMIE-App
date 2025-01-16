import React from "react";
import { ScrollView, FlatList, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Text } from "@tamagui/core";

import RoomCard from "@/components/cards/RoomCard";
import useFetchRooms from "@/hooks/queries/useFetchRooms";

const screenWidth = Dimensions.get("screen").width;

const Booking = () => {
  const { data } = useFetchRooms();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ backgroundColor: "white" }}>
        <Text px={15} pt={20} pb={10} fos={16} fow={"bold"}>
          Available Rooms
        </Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RoomCard
              key={item.id}
              items={item}
              width={screenWidth / 2 - 20}
              height={200}
              onPress={() =>
                router.replace({
                  pathname: "../screens/[roomPreview]",
                  params: {
                    roomName: item.room_name,
                    roomCategory: item.room_type,
                    roomImage: item.room_image,
                    customRoute: "/(tabs)/booking",
                  },
                })
              }
            />
          )}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-around" }}
          contentContainerStyle={{ gap: 20, padding: 5 }}
          showsVerticalScrollIndicator={false}
          initialNumToRender={15}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Booking;
