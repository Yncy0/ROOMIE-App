import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import useFetchRooms from "@/hooks/queries/useFetchRooms";
import RoomCard from "@/components/cards/RoomCard";
import useThemeColor from "@/hooks/useThemeColor";
import { router } from "expo-router";
import RoomSkeletonLoader from "@/components/loader/RoomsSkeletonLoader";
import * as SplashScreen from "expo-splash-screen";

const screenWidth = Dimensions.get("screen").width;

const Rooms = () => {
  const { data, isLoading, error } = useFetchRooms();
  const { themeTextStyle, themeBackgroundStyle } = useThemeColor();

  React.useEffect(() => {
    if (error) {
      console.error("Error fetching rooms:", error);
      SplashScreen.hideAsync();
      return;
    }

    if (!isLoading) {
      console.log("rooms.tsx loaded");
      SplashScreen.hideAsync();
      console.log("Hide SplashScreen rooms.tsx");
    } else {
      console.log("rooms.tsx is still loading");
    }
  }, [isLoading, error]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, themeBackgroundStyle]}>
        <Text style={[styles.header, themeTextStyle]}>Available Rooms</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            isLoading ? (
              <RoomSkeletonLoader />
            ) : (
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
            )
          }
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
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
});
