import React from "react";
import { FlatList, Dimensions, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import RoomCard from "@/components/cards/RoomCard";
import useFetchRooms from "@/hooks/queries/useFetchRooms";
import useThemeColor from "@/hooks/useThemeColor";

const screenWidth = Dimensions.get("screen").width;

const Booking = () => {
  const { data } = useFetchRooms();
  const { themeContainerStyle, themeTextStyle } = useThemeColor();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={themeContainerStyle}>
        <Text
          style={[
            {
              paddingHorizontal: 10,
              paddingTop: 20,
              paddingBottom: 10,
              fontSize: 16,
              fontWeight: "bold",
            },
            themeTextStyle,
          ]}
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
                  pathname: "/screens/roomPreview/[id]",
                  params: {
                    id: item.id,
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
