import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Alert, Image, Pressable, ScrollView, View, Text } from "react-native";

import * as MediaLibrary from "expo-media-library";
import ViewShot, { captureRef } from "react-native-view-shot";

import BackButton from "@/components/buttons/BackButton";
import TextHorizontal from "@/components/TextHorizontal";
import useColorTheme from "@/hooks/useColorTheme";

const BookingReceipt = () => {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const viewRef = React.useRef<View>(null);

  const { themeContainerStyle, themeTextStyle } = useColorTheme();

  React.useEffect(() => {
    if (status === null) {
      requestPermission();
    }
  }, [status, requestPermission]);

  const {
    id,
    subjectCode,
    courseAndSection,
    date,
    timeIn,
    timeOut,
    roomCategory,
    roomImage,
    roomName,
  } = useLocalSearchParams<{
    id: string;
    subjectCode: string;
    courseAndSection: string;
    date: string;
    timeIn: string;
    timeOut: string;
    roomName: string;
    roomCategory: string;
    roomImage: string;
  }>();

  const referenceNumber = id.substring(0, 7).toUpperCase();

  const onSaveViewAsync = async () => {
    try {
      const localUri = await captureRef(viewRef, {
        format: "png",
        quality: 1,
      });
      if (localUri) {
        await MediaLibrary.saveToLibraryAsync(localUri);
        Alert.alert("Saved!");
        router.replace("/(tabs)");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Cannot save!");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[{ flex: 1 }, themeContainerStyle]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Stack.Screen name="Receipt" options={{ headerShown: false }} />
          <ViewShot style={{ padding: 30 }} ref={viewRef}>
            <View
              style={{
                flexDirection: "column",
                width: "100%",
                flex: 1,
                alignItems: "center",
                paddingVertical: 20,
                paddingHorizontal: 20,
                gap: 20,
                backgroundColor: "white",
                borderRadius: 10,
                elevation: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minWidth: "100%",
                }}
              >
                <BackButton
                  onPress={() => router.replace("/(tabs)")}
                  size={24}
                />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                Reservation Details
              </Text>
              <Ionicons name={"checkmark-circle-sharp"} size={74} />
              <View style={{ alignItems: "center", flexDirection: "column" }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Your Booking Confirmed!
                </Text>
                <Text>{`Reference No: "MR${referenceNumber}"`}</Text>
              </View>

              <Image
                source={{ uri: roomImage }}
                style={{
                  minHeight: 170,
                  minWidth: 250 / 2,
                  width: 250,
                  maxWidth: 250 * 2,
                }}
              />
              <View
                style={{
                  alignItems: "center",
                  paddingBottom: 20,
                  flexDirection: "column",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {roomName}
                </Text>
                <Text>{roomCategory}</Text>
              </View>
              <Text style={{ paddingBottom: 20 }}>Details</Text>
              <View style={{ minWidth: "100%", gap: 10 }}>
                <TextHorizontal description="Date Booked:" value={date} />

                <TextHorizontal
                  description="Time:"
                  value={`${timeIn}-${timeOut}`}
                />

                <TextHorizontal description="Subject" value={subjectCode} />

                <TextHorizontal
                  description="Section"
                  value={courseAndSection}
                />

                <Pressable
                  style={{
                    backgroundColor: "white",
                    alignSelf: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 5,
                  }}
                  onPress={onSaveViewAsync}
                >
                  <Ionicons name={"download-outline"} size={20} />
                  <Text>Download</Text>
                </Pressable>
              </View>
            </View>
          </ViewShot>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default BookingReceipt;
