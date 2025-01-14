import BackButton from "@/components/buttons/BackButton";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, YStack } from "tamagui";

const BookingReceipt = () => {
  const {
    id,
    subjectName,
    courseAndSection,
    date,
    timeIn,
    timeOut,
    roomId,
    roomCategory,
    roomImage,
    roomName,
    customRoute,
  } = useLocalSearchParams<{
    id: any;
    subjectName: string;
    courseAndSection: string;
    date: string;
    timeIn: string;
    timeOut: string;
    roomId: any;
    roomName: string;
    roomCategory: string;
    roomImage: string;
    customRoute: any;
  }>();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Stack.Screen name="Receipt" options={{ headerShown: false }} />
      <YStack>
        <BackButton onPress={() => router.replace("/(tabs)")} />
        <Text>Reservation Details</Text>
        <Ionicons name={"checkmark-circle-sharp"} size={74} />
        <Text>Your Booking Confirmed!</Text>
        <Text>{`Reference No: ${id}`}</Text>
        <Image source={{ uri: roomImage }} minHeight={170} maxWidth={250} />
        <YStack>
          <Text>{roomName}</Text>
          <Text>{roomCategory}</Text>
          <Text>Details</Text>
        </YStack>
      </YStack>
    </ScrollView>
  );
};

export default BookingReceipt;
