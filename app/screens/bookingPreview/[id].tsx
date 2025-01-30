import { Ionicons } from "@expo/vector-icons";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
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
  Modal,
} from "react-native";

import * as MediaLibrary from "expo-media-library";
import DateTimePicker from "@react-native-community/datetimepicker";

import BackButton from "@/components/buttons/BackButton";
import TextHorizontal from "@/components/TextHorizontal";
import useThemeColor from "@/hooks/useThemeColor";
import { pressBack } from "@/utils/pressBack";
import { formatTimeMeridian } from "@/utils/timeUtils";
import { primaryColor } from "@/constants/Colors";
import { useUpdateBookedRoomPending } from "@/hooks/queries/bookedRooms/useUpdateBookedRooms";
import useHandleEdit from "@/hooks/useHandleEdit";
import DropdownSubject from "@/components/dropdowns/DropdownSubject";
import DropdownRooms from "@/components/dropdowns/DropdownRooms";
import DropdownCourse from "@/components/dropdowns/DropdownCourse";
import { useAuth } from "@/providers/AuthProvider";
import IconInput from "@/components/inputs/IconInput";
import useCheckForOverlap from "@/hooks/queries/bookedRooms/useCheckOverlap";
import useInsertBookedRooms from "@/hooks/queries/bookedRooms/useInsertBookedRooms";
import { useFetchBookedRoomsWithId } from "@/hooks/queries/bookedRooms/useFetchBookedRooms";

const BookingPreview = () => {
  const { themeBackgroundStyle, themeTextStyle, themeContainerStyle } =
    useThemeColor();

  const { id, roomId, roomImage } = useLocalSearchParams<{
    id: any;
    roomId: any;
    roomImage: string;
  }>();

  const { data, error } = useFetchBookedRoomsWithId(id);

  const referenceNumber = id.substring(0, 7).toUpperCase();

  const [visible, setVisible] = React.useState(false);
  const [rooms, setRooms] = React.useState<any>([]);

  // Default values
  const [subject, setSubject] = React.useState(data?.subject_code || "");
  const [course, setCourse] = React.useState(data?.course_and_section || "");

  const dayjs = require("dayjs");
  require("dayjs/plugin/timezone");
  require("dayjs/plugin/utc");

  // Load plugins
  dayjs.extend(require("dayjs/plugin/timezone"));
  dayjs.extend(require("dayjs/plugin/utc"));

  pressBack("/(tabs)");

  const { datePicker, timeInPicker, timeOutPicker, handleEdit } = useHandleEdit(
    {
      bookingId: id,
      roomId: roomId,
      roomImage: roomImage,
      initialDate: data?.date as string,
      initialTimeIn: data?.time_in as string,
      initialTimeOut: data?.time_out as string,
      initialSubjectCode: data?.subject_code as string,
      initialCourseAndSection: data?.course_and_section as string,
    }
  );

  const localTimeIn = dayjs(timeInPicker.time).tz("Asia/Manila").format();
  const localTimeOut = dayjs(timeOutPicker.time).tz("Asia/Manila").format();

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
              <Text style={[styles.header2, themeTextStyle]}>
                {data?.rooms?.room_name}
              </Text>
              <Text style={[{ paddingBottom: 10 }, themeTextStyle]}>
                {data?.rooms?.room_type}
              </Text>
              <Text style={[styles.text1, themeTextStyle]}>Details</Text>
            </View>
            <View style={styles.container3}>
              <TextHorizontal
                description="Date Booked:"
                value={data?.date as string}
              />
              <TextHorizontal
                description="Time:"
                value={`${formatTimeMeridian(
                  data?.time_in
                )} - ${formatTimeMeridian(data?.time_out)}`}
              />
              <TextHorizontal
                description="Subject"
                value={data?.subject_code as string}
              />
              <TextHorizontal
                description="Section"
                value={data?.course_and_section as string}
              />
              <View style={styles.buttonContainer}>
                <Pressable
                  style={[styles.pressable, { backgroundColor: primaryColor }]}
                  onPress={() => setVisible(true)}
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
          <Modal visible={visible} style={{ flex: 1 }}>
            <View style={stylesModal.container}>
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
              <DropdownRooms value={rooms} onChange={setRooms} />
              <DropdownSubject value={subject} onChange={setSubject} />
              <DropdownCourse value={course} onChange={setCourse} />
              <View style={{ height: 50, width: "100%" }}>
                <IconInput
                  icon={"calendar-today"}
                  placeholder="Date"
                  onPress={() => datePicker.setOpen(true)}
                  value={dayjs(datePicker.date).format("DD MMMM YYYY")}
                  onChangeText={() => {}}
                />
              </View>
              <View style={{ gap: 20, flexDirection: "row" }}>
                <IconInput
                  icon={"schedule"}
                  placeholder="Time-in"
                  onPress={() => timeInPicker.setOpen(true)}
                  value={dayjs(timeInPicker.time).format("HH:mm: a")}
                  onChangeText={() => {}}
                />
                <IconInput
                  icon={"schedule"}
                  placeholder="Time-out"
                  onPress={() => timeOutPicker.setOpen(true)}
                  value={dayjs(timeOutPicker.time).format("HH:mm: a")}
                  onChangeText={() => {}}
                />
              </View>
              <Pressable style={stylesModal.pressable} onPress={handleEdit}>
                <Text style={stylesModal.text}>Edit</Text>
              </Pressable>
              <Pressable
                style={stylesModal.pressable}
                onPress={() => setVisible(false)}
              >
                <Text style={themeTextStyle}>Cancel</Text>
              </Pressable>
            </View>
          </Modal>
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

const stylesModal = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    flexDirection: "column",
    paddingHorizontal: 15,
  },
  pressable: {
    backgroundColor: primaryColor,
    minWidth: "100%",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 50,
  },
  text: { color: "white" },
});
