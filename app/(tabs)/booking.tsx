import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useFetchRooms from "@/hooks/useFetchRooms";
import RoomCard from "@/components/RoomCard";
import { router } from "expo-router";

const Booking = () => {
  const { data } = useFetchRooms();

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        {/*TODO: Convert to SCROLLLIST with FLATLIST HORIZONTAL when the room expanded*/}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{ padding: 20 }}>St. Agustine Building</Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <RoomCard
                key={item.id}
                items={item}
                width={230}
                height={290}
                onPress={() =>
                  router.replace({
                    pathname: "../screens/[roomPreview]",
                    params: {
                      roomName: item.room_name,
                      roomCategory: item.room_type,
                      roomImage: item.room_image,
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
};

export default Booking;
