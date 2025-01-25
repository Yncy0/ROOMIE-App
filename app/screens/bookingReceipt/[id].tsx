import { Ionicons } from "@expo/vector-icons";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
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

import * as MediaLibrary from "expo-media-library";
import ViewShot, { captureRef } from "react-native-view-shot";

import BackButton from "@/components/buttons/BackButton";
import TextHorizontal from "@/components/TextHorizontal";
import useThemeColor from "@/hooks/useThemeColor";
import { pressBack } from "@/utils/pressBack";

const BookingReceipt = () => {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const viewRef = React.useRef<View>(null);

  const { themeBackgroundStyle } = useThemeColor();

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

  pressBack("/(tabs)");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, themeBackgroundStyle]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Stack.Screen name="Receipt" options={{ headerShown: false }} />
          <ViewShot style={{ padding: 30 }} ref={viewRef}>
            <View style={styles.body}>
              {/* <View
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
              </View> */}
              <Text style={styles.header1}>Reservation Details</Text>
              <Ionicons name={"checkmark-circle-sharp"} size={74} />
              <View style={styles.container1}>
                <Text style={styles.header2}>Your Booking Confirmed!</Text>
                <Text>{`Reference No: "MR${referenceNumber}"`}</Text>
              </View>
              <Image source={{ uri: roomImage }} style={styles.image} />
              <View style={styles.container2}>
                <Text style={styles.header2}>{roomName}</Text>
                <Text>{roomCategory}</Text>
              </View>
              <Text style={styles.text1}>Details</Text>
              <View style={styles.text2}>
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
                <Pressable style={styles.pressable} onPress={onSaveViewAsync}>
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

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: {
    flexDirection: "column",
    width: "100%",
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
    gap: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,
  },
  header1: { fontSize: 16, fontWeight: "bold", alignSelf: "center" },
  header2: { fontSize: 18, fontWeight: "bold" },
  container1: { alignItems: "center", flexDirection: "column" },
  container2: {
    alignItems: "center",
    paddingBottom: 20,
    flexDirection: "column",
  },
  image: { minHeight: 170, minWidth: 250 / 2, width: 250, maxWidth: 250 * 2 },
  text1: { paddingBottom: 20 },
  text2: { minWidth: "100%", gap: 10 },
  pressable: {
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
});
