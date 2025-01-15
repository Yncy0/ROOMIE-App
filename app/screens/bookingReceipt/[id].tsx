import BackButton from "@/components/buttons/BackButton";
import TextHorizontal from "@/components/TextHorizontal";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, Separator, Text, XStack, YStack } from "tamagui";

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
    id: string;
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

  const referenceNumber = id.substring(0, 7).toUpperCase();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Stack.Screen name="Receipt" options={{ headerShown: false }} />
          <YStack
            width={"100%"}
            flex={1}
            alignItems="center"
            pt={20}
            px={20}
            gap={20}
          >
            <Text fontSize={16} fontWeight="bold">
              Reservation Details
            </Text>
            <Ionicons name={"checkmark-circle-sharp"} size={74} />
            <YStack alignItems="center">
              <Text fontSize={18} fontWeight="bold">
                Your Booking Confirmed!
              </Text>
              <Text>{`Reference No: "MR${referenceNumber}"`}</Text>
            </YStack>

            <Image
              source={{ uri: roomImage }}
              minHeight={170}
              minWidth={250 / 2}
              width={250}
              maxWidth={250 * 2}
            />
            <YStack alignItems="center" pb={20}>
              <Text fontSize={18} fontWeight={"bold"}>
                {roomName}
              </Text>
              <Text>{roomCategory}</Text>
            </YStack>
            <Text pb={20}>Details</Text>
            <YStack miw={"100%"} gap={10}>
              <TextHorizontal description="Date Booked:" value={date} />
              <Separator borderColor={"$gray8"} />
              <TextHorizontal
                description="Time:"
                value={`${timeIn}-${timeOut}`}
              />
              <Separator borderColor={"$gray8"} />
              <TextHorizontal description="Subject" value={subjectName} />
              <Separator borderColor={"$gray8"} />
              <TextHorizontal description="Section" value={courseAndSection} />
              <Separator borderColor={"$gray8"} />
            </YStack>
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default BookingReceipt;
