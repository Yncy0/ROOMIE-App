import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import {
  Button,
  Image,
  ScrollView,
  Separator,
  Text,
  XStack,
  YStack,
} from "tamagui";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

import BackButton from "@/components/buttons/BackButton";
import TextHorizontal from "@/components/TextHorizontal";

const BookingReceipt = () => {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = React.useRef<View>(null);

  if (status === null) {
    requestPermission();
  }

  const {
    id,
    subjectName,
    courseAndSection,
    date,
    timeIn,
    timeOut,
    roomCategory,
    roomImage,
    roomName,
  } = useLocalSearchParams<{
    id: string;
    subjectName: string;
    courseAndSection: string;
    date: string;
    timeIn: string;
    timeOut: string;
    roomName: string;
    roomCategory: string;
    roomImage: string;
  }>();

  const referenceNumber = id.substring(0, 7).toUpperCase();

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Stack.Screen name="Receipt" options={{ headerShown: false }} />
          <View style={{ padding: 30 }} ref={imageRef}>
            <YStack
              width={"100%"}
              flex={1}
              alignItems="center"
              py={20}
              px={20}
              gap={20}
              backgroundColor={"$white1"}
              borderRadius={"$3"}
              elevation={10}
            >
              <XStack
                alignItems="center"
                justifyContent="space-between"
                miw={"100%"}
              >
                <BackButton
                  onPress={() => router.replace("/(tabs)")}
                  size={24}
                />
              </XStack>
              <Text fontSize={16} fontWeight="bold" alignSelf="center">
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
                <TextHorizontal
                  description="Section"
                  value={courseAndSection}
                />
                <Separator borderColor={"$gray8"} />

                <Button
                  backgroundColor={"$white1"}
                  alignSelf="center"
                  icon={<Ionicons name={"download-outline"} size={20} />}
                  onPress={onSaveImageAsync}
                >
                  Download
                </Button>
              </YStack>
            </YStack>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default BookingReceipt;
