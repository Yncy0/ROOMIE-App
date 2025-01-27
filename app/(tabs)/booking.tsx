import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";

import useThemeColor from "@/hooks/useThemeColor";
import BookingsList from "@/components/lists/BookingsList";
import {
  useFetchBookedRooms,
  useFetchBookedRoomsWithUser,
} from "@/hooks/queries/bookedRooms/useFetchBookedRooms";
import HeaderFilter from "@/components/HeaderFilter";
import FABbooking from "@/components/buttons/FABbooking";

const Booking = () => {
  const { themeTextStyle, themeBackgroundStyle } = useThemeColor();
  const { data, isLoading, error } = useFetchBookedRooms();

  React.useEffect(() => {
    if (error) {
      console.error("Error fetching booked rooms:", error);
      SplashScreen.hideAsync();
      return;
    }

    if (!isLoading) {
      console.log("booking.tsx loaded successfully", isLoading);
      SplashScreen.hideAsync();
      console.log("Hide SplashScreen booking.tsx");
    } else {
      console.log("booking.tsx still loading");
    }
  }, [isLoading, error]);

  return (
    <SafeAreaProvider style={themeBackgroundStyle}>
      <SafeAreaView style={[styles.container, themeBackgroundStyle]}>
        <HeaderFilter text="Your Booked Rooms" />
        <BookingsList
          isHorizontal={false}
          bookedRooms={data}
          isLoading={isLoading}
        />
      </SafeAreaView>
      <FABbooking />
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
