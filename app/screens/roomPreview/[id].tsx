import React from "react";
import { ImageBackground, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router, Stack, useLocalSearchParams } from "expo-router";
import moment from "moment";
import { View, Text, Button, XStack, YStack } from "tamagui";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { BookingBottomSheet } from "@/components/BookingBottomSheet";
import BackButton from "@/components/buttons/BackButton";
import useFetchSchedule from "@/hooks/queries/useFetchSchedule";
import ScheduleText from "@/components/ScheduleText";

export default function RoomPreview() {
  const { id, roomName, roomCategory, roomImage, customRoute } =
    useLocalSearchParams<{
      id: any;
      roomName: string;
      roomCategory: string;
      roomImage: string;
      customRoute: any;
    }>();
  const { scheduleWithDateQuery } = useFetchSchedule();
  const bottomSheetMoadlRef = React.useRef<BottomSheetModal>(null);

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
              padding: 20,
              justifyContent: "space-between",
            }}
          >
            <BackButton
              onPress={() => router.replace({ pathname: customRoute })}
            />
            <XStack justifyContent={"space-between"} alignItems={"center"}>
              <View>
                <Text col={"$white1"} fos={20} fow={"bold"}>
                  {roomName}
                </Text>
                <Text col={"$white1"} fos={14}>
                  {roomCategory}
                </Text>
              </View>
              <Button
                bg={"$blue10"}
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
              <XStack ai={"center"} jc={"space-between"}>
                <Text>Today</Text>
                <Text>{moment().format("dddd, DD, MMM YYYY")}</Text>
              </XStack>
            </YStack>
            {scheduleWithDateQuery.data &&
              scheduleWithDateQuery.data.map((item) => (
                <ScheduleText key={item.id} items={item} />
              ))}
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
