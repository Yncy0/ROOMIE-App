import React from "react";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import useThemeColor from "@/hooks/useThemeColor";
import BookingsList from "@/components/lists/BookingsList";
import { useFetchBookedRooms } from "@/hooks/queries/bookedRooms/useFetchBookedRooms";

const Booking = () => {
  const { themeTextStyle, themeBackgroundStyle } = useThemeColor();
  const { data } = useFetchBookedRooms();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={themeBackgroundStyle}>
        <Text
          style={{
            paddingHorizontal: 15,
            paddingBottom: 10,
            fontSize: 16,
            fontWeight: "bold",
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
