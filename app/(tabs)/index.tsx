import React from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import RoomCard from "@/components/cards/RoomCard";
import BookingsList from "@/components/lists/BookingsList";
import useFetchRooms from "@/hooks/queries/useFetchRooms";
import useThemeColor from "@/hooks/useThemeColor";
import {
  useFetchBookedRooms,
  useFetchBookedRoomsWithUser,
} from "@/hooks/queries/bookedRooms/useFetchBookedRooms";
import RoomSkeletonLoader from "@/components/loader/RoomsSkeletonLoader";

export default function Index() {
  const { data: rooms, isLoading: roomsLoading } = useFetchRooms();
  const { data: bookedRooms, isLoading: bookedRoomsLoading } =
    useFetchBookedRooms();
  const { themeTextStyle, themeBackgroundStyle } = useThemeColor();

  React.useEffect(() => {
    if (!roomsLoading && !bookedRoomsLoading) {
      SplashScreen.hideAsync();
    }
  }, [roomsLoading, bookedRoomsLoading]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.backgroundContainer, themeBackgroundStyle]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container1}>
            <Text style={themeTextStyle}>My Booking</Text>
            <Pressable>
              <Link href={"/(tabs)/booking"} style={themeTextStyle}>
                See All
              </Link>
            </Pressable>
          </View>
          <BookingsList
            isHorizontal={true}
            bookedRooms={bookedRooms}
            isLoading={bookedRoomsLoading}
          />
          <View style={styles.container2}>
            <Text style={themeTextStyle}>{"Available Rooms"}</Text>
            <Pressable>
              <Link href={"/(tabs)/rooms"} style={themeTextStyle}>
                See More
              </Link>
            </Pressable>
          </View>
          <FlatList
            data={rooms}
            renderItem={({ item }) =>
              roomsLoading ? (
                <RoomSkeletonLoader />
              ) : (
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
              )
            }
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

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
  },
  container1: {
    flexDirection: "row",
    minWidth: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  container2: {
    flexDirection: "row",
    minWidth: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});
