import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  View,
  Text,
  StyleSheet,
  BackHandler,
} from "react-native";

import TextHorizontal from "@/components/TextHorizontal";
import useThemeColor from "@/hooks/useThemeColor";
import { formatTimeMeridian } from "@/utils/timeUtils";
import { pressBack } from "@/utils/pressBack";
import { primaryColor } from "@/constants/Colors";
const BookingPreview = () => {
  const {
    id,
    roomImage,
    roomName,
    roomType,
    date,
    subjectCode,
    courseAndSection,
    timeIn,
    timeOut,
  } = useLocalSearchParams<{
    id: any;
    roomImage: string;
    roomName: string;
    roomType: string;
    date: string;
    subjectCode: string;
    courseAndSection: string;
    timeIn: string;
    timeOut: string;
  }>();

  const { themeBackgroundStyle, themeTextStyle, themeContainerStyle } =
    useThemeColor();

  pressBack("/(tabs)");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, themeBackgroundStyle]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Stack.Screen name="View" options={{ headerShown: false }} />
          <View style={[styles.body, themeBackgroundStyle]}>
            <Text style={[styles.header1, themeTextStyle]}>
              Reservation Details
            </Text>
            <Text
              style={[styles.subHeader, themeTextStyle]}
            >{`Reference No: "MR${id}"`}</Text>
            <Image source={{ uri: roomImage }} style={styles.image} />
            <View style={styles.container2}>
              <Text style={styles.header2}>{roomName}</Text>
              <Text>{roomType}</Text>
            </View>
            <Text style={styles.text1}>Details</Text>
            <View style={styles.container3}>
              <TextHorizontal description="Date Booked:" value={date} />
              <TextHorizontal
                description="Time:"
                value={`${formatTimeMeridian(timeIn)}-${formatTimeMeridian(
                  timeOut
                )}`}
              />
              <TextHorizontal description="Subject" value={subjectCode} />
              <TextHorizontal description="Section" value={courseAndSection} />
            </View>
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.pressable, { backgroundColor: primaryColor }]}
              >
                <Text style={styles.textEdit}>Edit</Text>
              </Pressable>
              <Pressable style={[styles.pressable, themeContainerStyle]}>
                <Text style={themeTextStyle}>Cancelation</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default BookingPreview;

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
    gap: 20,
    backgroundColor: "white",
  },
  header1: { fontSize: 16, fontWeight: "bold", alignSelf: "flex-start" },
  header2: { fontSize: 18, fontWeight: "bold" },
  subHeader: { alignSelf: "flex-start" },
  container2: {
    alignItems: "center",
    paddingBottom: 20,
    flexDirection: "column",
  },
  image: { minHeight: 170, minWidth: 250 / 2, width: 250, maxWidth: 250 * 2 },
  text1: { paddingBottom: 20 },
  container3: { minWidth: "100%", gap: 25, paddingBottom: 20 },
  pressable: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    backgroundColor: primaryColor,
    borderRadius: 50,
    padding: 12,
    justifyContent: "center",
    elevation: 10,
  },
  //
  textEdit: {
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 5,
  },
});
