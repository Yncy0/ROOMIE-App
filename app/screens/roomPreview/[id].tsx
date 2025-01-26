import React from "react";
import {
  ImageBackground,
  ScrollView,
  View,
  Button,
  Text,
  BackHandler,
  StyleSheet,
} from "react-native";
import {
  GestureHandlerRootView,
  Pressable,
} from "react-native-gesture-handler";
import { router, Stack, useLocalSearchParams } from "expo-router";
import dayjs from "dayjs";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { primaryColor } from "@/constants/Colors";
import { BookingBottomSheet } from "@/components/BookingBottomSheet";
import BackButton from "@/components/buttons/BackButton";
import ScheduleText from "@/components/ScheduleText";
import EmptyDisplay from "@/components/EmptyDisplay";
import { useFetchScheduleWithRoom } from "@/hooks/queries/schedule/useFetchSchedule";
import { useFetchBookedRoomsWithRooms } from "@/hooks/queries/bookedRooms/useFetchBookedRooms";
import useSubscriptionSchedule from "@/hooks/queries/schedule/useSubscription";
import useSubscriptionBookedRoom from "@/hooks/queries/bookedRooms/useSubscription";
import BookingsList from "@/components/lists/BookingsList";
import useThemeColor from "@/hooks/useThemeColor";
import { formatCompleteDate } from "@/utils/timeUtils";
import { pressBack } from "@/utils/pressBack";
import * as SplashScreen from "expo-splash-screen";

export default function RoomPreview() {
  const { id, roomName, roomCategory, roomImage, customRoute } =
    useLocalSearchParams<{
      id: any;
      roomName: string;
      roomCategory: string;
      roomImage: string;
      customRoute: any;
    }>();
  const day = dayjs().format("dddd");

  const { themeBackgroundStyle, themeTextStyle, themeHandler } =
    useThemeColor();

  const {
    data: schedule,
    isLoading: scheduleLoading,
    error: scheduleError,
  } = useFetchScheduleWithRoom(day, id);
  const {
    data: bookedRooms,
    isLoading: bookedRoomsLoading,
    error: bookedRoomsError,
  } = useFetchBookedRoomsWithRooms(id);

  const bottomSheetMoadlRef = React.useRef<BottomSheetModal>(null);

  useSubscriptionBookedRoom();
  useSubscriptionSchedule();

  React.useEffect(() => {
    if (scheduleError || bookedRoomsError) {
      console.error("Error fetching data:", scheduleError, bookedRoomsError);
      SplashScreen.hideAsync();
      return;
    }

    if (!scheduleLoading && !bookedRoomsLoading) {
      console.log("roomPreview loaded");
      SplashScreen.hideAsync();
      console.log("hide SplashScreen roomPreview");
    } else {
      console.log("roomPreview still loading");
    }
  }, [scheduleLoading, bookedRoomsLoading, scheduleError, bookedRoomsError]);

  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetMoadlRef.current?.present();
  }, []);

  const renderBackdrop = React.useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    []
  );

  pressBack(customRoute);

  return (
    <GestureHandlerRootView style={[styles.container, themeBackgroundStyle]}>
      <BottomSheetModalProvider>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Stack.Screen options={{ headerShown: false }} />
          <ImageBackground
            source={{ uri: roomImage }}
            style={styles.imageBackground}
          >
            <View style={styles.opaque}>
              <View>
                <Text style={styles.header1}>{roomName}</Text>
                <Text style={styles.header2}>{roomCategory}</Text>
              </View>
              <Pressable
                style={styles.pressable}
                onPress={handlePresentModalPress}
              >
                <Text style={styles.text1}>Book Now</Text>
              </Pressable>
            </View>
          </ImageBackground>
          <View style={styles.container1}>
            <View style={styles.container2}>
              <Text style={[styles.header3, themeTextStyle]}>
                Today's Booking
              </Text>
              <BookingsList
                isHorizontal={true}
                bookedRooms={bookedRooms}
                isLoading={bookedRoomsLoading}
              />
            </View>
            <View style={styles.container3}>
              <Text style={[styles.text2, themeTextStyle]}>
                Today's Schedule
              </Text>
              <Text style={[styles.text2, themeTextStyle]}>
                {formatCompleteDate()}
              </Text>
            </View>
            {schedule && schedule.length > 0 ? (
              schedule.map((item) => (
                <ScheduleText key={item.id} items={item} />
              ))
            ) : (
              <EmptyDisplay />
            )}
          </View>
        </ScrollView>
        <BottomSheetModal
          ref={bottomSheetMoadlRef}
          handleStyle={themeBackgroundStyle}
          handleIndicatorStyle={{
            backgroundColor: themeHandler.backgroundColor,
          }}
          backdropComponent={renderBackdrop}
        >
          <BookingBottomSheet
            roomId={id}
            roomName={roomName}
            roomCategory={roomCategory}
            roomImage={roomImage}
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    height: 275,
    justifyContent: "flex-end",
  },
  opaque: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
  },
  header1: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  header2: {
    color: "white",
    fontSize: 14,
  },
  header3: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 15,
  },
  text1: {
    color: "white",
  },
  text2: {
    paddingHorizontal: 15,
  },
  pressable: {
    backgroundColor: primaryColor,
    borderRadius: 10,
    minWidth: 180,
    padding: 10,
    alignItems: "center",
  },
  container1: {
    paddingTop: 20,
    gap: 20,
  },
  container2: {
    gap: 5,
    flexDirection: "column",
  },
  container3: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
