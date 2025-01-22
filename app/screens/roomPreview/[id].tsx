import React from "react";
import { ImageBackground, ScrollView, View, Button, Text } from "react-native";
import {
  GestureHandlerRootView,
  Pressable,
} from "react-native-gesture-handler";
import { router, Stack, useLocalSearchParams } from "expo-router";
import moment from "moment";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { primaryColor } from "@/constants/Colors";
import { BookingBottomSheet } from "@/components/BookingBottomSheet";
import BackButton from "@/components/buttons/BackButton";
import ScheduleText from "@/components/ScheduleText";
import EmptyDisplay from "@/components/EmptyDisplay";
import BookedCard from "@/components/cards/BookedCard";
import { useFetchScheduleWithRoom } from "@/hooks/queries/schedule/useFetchSchedule";
import { useFetchBookedRoomsWithRooms } from "@/hooks/queries/bookedRooms/useFetchBookedRooms";
import useSubscriptionSchedule from "@/hooks/queries/schedule/useSubscription";
import useSubscriptionBookedRoom from "@/hooks/queries/bookedRooms/useSubscription";

export default function RoomPreview() {
  const { id, roomName, roomCategory, roomImage, customRoute } =
    useLocalSearchParams<{
      id: any;
      roomName: string;
      roomCategory: string;
      roomImage: string;
      customRoute: any;
    }>();
  const day = moment().format("dddd");

  const { data: schedule } = useFetchScheduleWithRoom(day, id);
  const { data: bookedRooms } = useFetchBookedRoomsWithRooms(id);

  const bottomSheetMoadlRef = React.useRef<BottomSheetModal>(null);

  // useSubscriptionBookedRoom();
  // useSubscriptionSchedule();

  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetMoadlRef.current?.present();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Stack.Screen options={{ headerShown: false }} />
          <ImageBackground
            source={{ uri: roomImage }}
            style={{
              height: 275,
              justifyContent: "space-between",
            }}
          >
            <BackButton
              onPress={() => router.replace({ pathname: customRoute })}
            />
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: 10,
              }}
            >
              <View>
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  {roomName}
                </Text>
                <Text style={{ color: "white", fontSize: 14 }}>
                  {roomCategory}
                </Text>
              </View>
              <Pressable
                style={{
                  backgroundColor: primaryColor,
                  borderRadius: 10,
                  minWidth: 180,
                }}
                onPress={handlePresentModalPress}
              >
                <Text style={{ color: "white" }}>Book Now</Text>
              </Pressable>
            </View>
          </ImageBackground>
          <View style={{ padding: 20, gap: 20 }}>
            <View style={{ gap: 5 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Today's Booking
              </Text>
              {bookedRooms && bookedRooms.length > 0 ? (
                bookedRooms.map((item) => (
                  <BookedCard key={item.id} items={item} />
                ))
              ) : (
                <Text style={{ alignSelf: "center", paddingHorizontal: 35 }}>
                  Empty Booked List
                </Text>
              )}
            </View>
            <View
              style={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Text>Today's Schedule</Text>
              <Text>{moment().format("dddd, DD, MMM YYYY")}</Text>
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
        <BottomSheetModal ref={bottomSheetMoadlRef}>
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
