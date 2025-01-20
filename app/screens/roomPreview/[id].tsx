import React from "react";
import { ImageBackground, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router, Stack, useLocalSearchParams } from "expo-router";
import moment from "moment";
import { View, Text, Button, XStack, YStack, Separator } from "tamagui";
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

  useSubscriptionSchedule();

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
            <XStack
              justifyContent={"space-between"}
              alignItems={"center"}
              backgroundColor={"rgba(0,0,0,0.5)"}
              px={20}
              py={10}
            >
              <View>
                <Text col={"$white1"} fos={20} fow={"bold"}>
                  {roomName}
                </Text>
                <Text col={"$white1"} fos={14}>
                  {roomCategory}
                </Text>
              </View>
              <Button
                bg={primaryColor}
                color={"$white1"}
                onPress={handlePresentModalPress}
                borderRadius={"$radius.2"}
                miw={183}
              >
                Book Now
              </Button>
            </XStack>
          </ImageBackground>
          <View p={20} gap={20}>
            <YStack gap={5}>
              <Text fos={16} fow="bold">
                Today's Booking
              </Text>
              {bookedRooms && bookedRooms.length > 0 ? (
                bookedRooms.map((item) => (
                  <BookedCard key={item.id} items={item} />
                ))
              ) : (
                <Text alignSelf="center" py={35}>
                  Empty Booked List
                </Text>
              )}
            </YStack>
            <Separator borderColor={"$gray8"} />
            <XStack ai={"center"} jc={"space-between"}>
              <Text>Today's Schedule</Text>
              <Text>{moment().format("dddd, DD, MMM YYYY")}</Text>
            </XStack>
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
