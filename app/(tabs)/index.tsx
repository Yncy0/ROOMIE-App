import React from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import {
  ActivityIndicator,
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
import useFetchRooms from "@/hooks/queries/useFetchRooms";
import useThemeColor from "@/hooks/useThemeColor";
import { useFetchBookedRoomsWithUser } from "@/hooks/queries/bookedRooms/useFetchBookedRooms";
import RoomSkeletonLoader from "@/components/loader/RoomsSkeletonLoader";
import FABbooking from "@/components/buttons/FABbooking";
import BookingSkeletonLoader from "@/components/loader/BookingSkeletonLoader";
import BookedCard from "@/components/cards/BookedCard";
import EmptyDisplay from "@/components/EmptyDisplay";

export default function Index() {
  const {
    data: rooms,
    isLoading: roomsLoading,
    error: roomsError,
  } = useFetchRooms();
  const {
    data: bookedRooms,
    isLoading: bookedRoomsLoading,
    error: bookedRoomsError,
  } = useFetchBookedRoomsWithUser();
  const { themeTextStyle, themeBackgroundStyle } = useThemeColor();

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
          {bookedRooms && bookedRooms.length > 0 ? (
            <FlatList
              horizontal
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.list}
              data={bookedRooms}
              renderItem={({ item }) =>
                bookedRoomsLoading ? (
                  <BookingSkeletonLoader />
                ) : (
                  <BookedCard items={item} />
                )
              }
            />
          ) : (
            <EmptyDisplay />
          )}
          <View style={styles.container2}>
            <Text style={themeTextStyle}>{"Available Rooms"}</Text>
            <Pressable>
              <Link href={"/(tabs)/rooms"} style={themeTextStyle}>
                See More
              </Link>
            </Pressable>
          </View>
          <FlatList
            data={rooms && Array.isArray(rooms) ? rooms.slice(0, 3) : []}
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
                        image: item.room_image,
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
            initialNumToRender={5}
            maxToRenderPerBatch={5}
          />
        </ScrollView>
        <FABbooking />
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
  list: {
    gap: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
