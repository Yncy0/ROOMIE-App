import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";

import useThemeColor from "@/hooks/useThemeColor";
import BookingsList from "@/components/lists/BookingsList";
import {
  useFetchBookedRooms,
  useFetchBookedRoomsWithUser,
} from "@/hooks/queries/bookedRooms/useFetchBookedRooms";
import FABbooking from "@/components/buttons/FABbooking";
import FilterBookingButton from "@/components/buttons/FilterBookingButton";

const Booking = () => {
  const { themeTextStyle, themeBackgroundStyle } = useThemeColor();
  const { data, isLoading, error } = useFetchBookedRoomsWithUser();

  const [filterType, setFilterType] = React.useState<any | null>(null);

  return (
    <SafeAreaProvider style={themeBackgroundStyle}>
      <SafeAreaView style={[styles.container, themeBackgroundStyle]}>
        <View style={styles.headerWrapper}>
          <Text style={themeTextStyle}>Available Rooms</Text>
          {/* <FilterBookingButton
            filterType={filterType}
            setFilterType={setFilterType}
          /> */}
        </View>
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
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
