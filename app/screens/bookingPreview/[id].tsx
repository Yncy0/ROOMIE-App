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
import DateTimePicker from "@react-native-community/datetimepicker";

import useThemeColor from "@/hooks/useThemeColor";
import { formatDate, formatTimeMeridian } from "@/utils/timeUtils";
import { pressBack } from "@/utils/pressBack";
import { primaryColor } from "@/constants/Colors";
import InputHorizontal from "@/components/InputHorizontal";
import useHandleEdit from "@/hooks/useHandleEdit";

// Added hooks for DatePicker
const BookingPreview = () => {
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

  const { themeBackgroundStyle, themeTextStyle, themeContainerStyle } =
    useThemeColor();

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

  pressBack("/(tabs)");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, themeBackgroundStyle]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Stack.Screen name="View" options={{ headerShown: false }} />
          <View style={[styles.body, themeBackgroundStyle]}>
            {datePicker.open && (
              <DateTimePicker
                mode="date"
                value={datePicker.date}
                display="calendar"
                onChange={(event, selectedDate) => {
                  datePicker.onConfirm(selectedDate || datePicker.date);
                }}
              />
            )}

            {timeInPicker.open && (
              <DateTimePicker
                mode="time"
                value={timeInPicker.time}
                display="spinner"
                onChange={(event, selectedTime) => {
                  timeInPicker.onConfirm(selectedTime || timeInPicker.time);
                }}
              />
            )}

            {timeOutPicker.open && (
              <DateTimePicker
                mode="time"
                value={timeOutPicker.time}
                display="spinner"
                onChange={(event, selectedTime) => {
                  timeOutPicker.onConfirm(selectedTime || timeOutPicker.time);
                }}
              />
            )}
            <Text style={[styles.header1, themeTextStyle]}>
              Reservation Details
            </Text>
            <Text
              style={[styles.subHeader, themeTextStyle]}
            >{`Reference No: "MR${id}"`}</Text>
            <Image source={{ uri: roomImage }} style={styles.image} />
            <View style={styles.container2}>
              <Text style={[styles.header2, themeTextStyle]}>{roomName}</Text>
              <Text style={themeTextStyle}>{roomType}</Text>
            </View>
            <Text style={[styles.text1, themeTextStyle]}>Details</Text>
            <View style={styles.container3}>
              <InputHorizontal
                description="Date Booked:"
                onPress={() => datePicker.setOpen(true)}
                value={formatDate(datePicker.date)}
                onChangeText={() => {}}
              />
              <InputHorizontal
                description="Time in:"
                onPress={() => timeInPicker.setOpen(true)}
                value={formatTimeMeridian(timeInPicker.time)}
                onChangeText={() => {}}
              />
              <InputHorizontal
                description="Time out:"
                onPress={() => timeOutPicker.setOpen(true)}
                value={formatTimeMeridian(timeOutPicker.time)}
                onChangeText={() => {}}
              />
              <InputHorizontal
                description="Subject:"
                value={editSubjectCode}
                onChangeText={setEditSubjectCode}
              />
              <InputHorizontal
                description="Section:"
                value={editCourseAndSection}
                onChangeText={setEditCourseAndSection}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.pressable, { backgroundColor: primaryColor }]}
                onPress={handleEdit}
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
  container: {
    flex: 1,
  },
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
  header1: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  header2: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subHeader: {
    alignSelf: "center",
    textAlign: "center",
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
    gap: 25,
    paddingBottom: 20,
  },
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
  textEdit: {
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 5,
  },
});
