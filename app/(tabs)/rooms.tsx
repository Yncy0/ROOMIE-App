import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import useFetchRooms from "@/hooks/queries/useFetchRooms";
import RoomCard from "@/components/cards/RoomCard";
import useThemeColor from "@/hooks/useThemeColor";
import { router } from "expo-router";

const screenWidth = Dimensions.get("screen").width;

const Rooms = () => {
  const { data } = useFetchRooms();
  const { themeTextStyle, themeBackgroundStyle } = useThemeColor();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: themeBackgroundStyle.backgroundColor,
        }}
      >
        <Text
          style={{
            paddingHorizontal: 15,
            paddingBottom: 10,
            fontSize: 16,
            fontWeight: "bold",
            color: themeTextStyle.color,
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
                  pathname: "/screens/roomPreview/[id]",
                  params: {
                    id: item.id,
                    roomName: item.room_name,
                    roomCategory: item.room_type,
                    roomImage: item.room_image,
                    customRoute: "/(tabs)/rooms",
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

export default Rooms;
