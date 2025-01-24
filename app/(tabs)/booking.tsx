import React from "react";
import { Text } from "react-native";
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
            color: themeTextStyle.color,
          }}
        >
          Your Booked Rooms
        </Text>
        <BookingsList isHorizontal={false} bookedRooms={data} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Booking;
