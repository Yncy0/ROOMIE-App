import { View, Text, FlatList, StyleSheet } from "react-native";
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
      <SafeAreaView style={[styles.container, themeBackgroundStyle]}>
        <Text style={[styles.header, themeTextStyle]}>Available Rooms</Text>
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

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
});
