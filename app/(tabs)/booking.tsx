import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import useThemeColor from "@/hooks/useThemeColor";
import BookingsList from "@/components/lists/BookingsList";
import {
  useFetchBookedRooms,
  useFetchBookedRoomsWithUser,
} from "@/hooks/queries/bookedRooms/useFetchBookedRooms";

const Booking = () => {
  const { themeTextStyle, themeBackgroundStyle } = useThemeColor();
  const { data } = useFetchBookedRoomsWithUser();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, themeBackgroundStyle]}>
        <Text style={[styles.header, themeTextStyle]}>Your Booked Rooms</Text>
        <BookingsList isHorizontal={false} bookedRooms={data} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
});
