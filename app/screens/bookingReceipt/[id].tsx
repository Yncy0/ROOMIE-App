import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, YStack } from "tamagui";

const BookingReceipt = () => {
  const {
    id,
    subjectName,
    courseAndSection,
    data,
    timeIn,
    timeOut,
    roomId,
    roomCategory,
    roomImage,
    roomName,
    customRoute,
  } = useLocalSearchParams();

  return (
    <YStack>
      <Text>{id}</Text>
    </YStack>
  );
};

export default BookingReceipt;
