import { View, Text, ScrollView, FlatList, Dimensions } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useFetchRooms from "@/hooks/useFetchRooms";
import RoomCard from "@/components/RoomCard";
import { router } from "expo-router";

const screenWidth = Dimensions.get("screen").width;

const Booking = () => {
  const { data } = useFetchRooms();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ backgroundColor: "white" }}>
        <Text
          style={{
            paddingHorizontal: 15,
            paddingTop: 20,
            paddingBottom: 10,
            fontSize: 16,
            fontWeight: "semibold",
          }}
        >
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
