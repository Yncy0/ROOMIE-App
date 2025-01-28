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
import { formatTimeMeridian } from "@/utils/timeUtils";
import { primaryColor } from "@/constants/Colors";
import { useUpdateBookedRoomPending } from "@/hooks/queries/bookedRooms/useUpdateBookedRooms";
import useHandleEdit from "@/hooks/useHandleEdit";

const BookingReceipt = () => {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const viewRef = React.useRef<View>(null);

  const { themeBackgroundStyle, themeTextStyle, themeContainerStyle } =
    useThemeColor();

  React.useEffect(() => {
    if (status === null) {
      requestPermission();
    }
  }, [status, requestPermission]);

  const {
    id,
    subjectCode,
    courseAndSection,
    roomId,
    roomImage,
    roomName,
    roomType,
    date,
    timeIn,
    timeOut,
  } = useLocalSearchParams<{
    id: any;
    roomId: any;
    roomImage: string;
    roomName: string;
    roomType: string;
    date: string;
    subjectCode: string;
    courseAndSection: string;
    timeIn: string;
    timeOut: string;
  }>();

  const referenceNumber = id.substring(0, 7).toUpperCase();

  pressBack("/(tabs)");

  const {
    subjectCode: editSubjectCode,
    setSubjectCode: setEditSubjectCode,
    courseAndSection: editCourseAndSection,
    setCourseAndSection: setEditCourseAndSection,
    datePicker,
    timeInPicker,
    timeOutPicker,
    handleEdit,
  } = useHandleEdit({
    bookingId: id,
    roomId: roomId,
    roomImage: roomImage,
    initialDate: date,
    initialTimeIn: timeIn,
    initialTimeOut: timeOut,
    initialSubjectCode: subjectCode,
    initialCourseAndSection: courseAndSection,
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, themeBackgroundStyle]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Stack.Screen name="Receipt" options={{ headerShown: false }} />
          <View style={[styles.body, themeBackgroundStyle]}>
            <View style={styles.container1}>
              <Text style={[styles.header1, themeTextStyle]}>
                Reservation Details
              </Text>
              <Text style={[styles.header2, themeTextStyle]}>
                Your Booking Confirmed! Please wait form confirmation
              </Text>
              <Text
                style={[{ textAlign: "center" }, themeTextStyle]}
              >{`Reference No: "MR${referenceNumber}"`}</Text>
            </View>
            <Image source={{ uri: roomImage }} style={styles.image} />
            <View style={styles.container2}>
              <Text style={[styles.header2, themeTextStyle]}>{roomName}</Text>
              <Text style={[{ paddingBottom: 10 }, themeTextStyle]}>
                {roomType}
              </Text>
              <Text style={[styles.text1, themeTextStyle]}>Details</Text>
            </View>
            <View style={styles.container3}>
              <TextHorizontal description="Date Booked:" value={date} />
              <TextHorizontal
                description="Time:"
                value={`${formatTimeMeridian(timeIn)} - ${formatTimeMeridian(
                  timeOut
                )}`}
              />
              <TextHorizontal description="Subject" value={subjectCode} />
              <TextHorizontal description="Section" value={courseAndSection} />
              <View style={styles.buttonContainer}>
                <Pressable
                  style={[styles.pressable, { backgroundColor: primaryColor }]}
                  onPress={handleEdit}
                >
                  <Text style={styles.textEdit}>Edit</Text>
                </Pressable>
                <Pressable
                  style={[styles.pressable, themeContainerStyle]}
                  onPress={() =>
                    Alert.alert(
                      "Cancelation Request", // Title of the alert dialog
                      "Are you sure you want to cancel?", // Message to be displayed
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                        },
                        {
                          text: "OK",
                          onPress: () => useUpdateBookedRoomPending(id),
                        },
                      ],
                      { cancelable: false } // This option makes sure the user must tap a button before the alert can be dismissed
                    )
                  }
                >
                  <Text style={themeTextStyle}>Cancelation</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default BookingReceipt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  },
  header1: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    paddingBottom: 10,
  },
  header2: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
  },
  container1: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
  },
  container2: {
    alignItems: "center",
    paddingBottom: 20,
    flexDirection: "column",
  },
  image: {
    minHeight: 170,
    minWidth: 250 / 2,
    width: 250,
    maxWidth: 250 * 2,
  },
  text1: {
    paddingBottom: 20,
  },
  container3: {
    minWidth: "100%",
    gap: 20,
  },
  pressable: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    backgroundColor: primaryColor,
    borderRadius: 10,
    padding: 12,
    justifyContent: "center",
    elevation: 10,
  },
  textEdit: {
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
  },
});
