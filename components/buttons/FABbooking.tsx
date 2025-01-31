import { View, Text, Modal, Pressable, StyleSheet, Alert } from "react-native";
import React from "react";
import { FAB } from "@rneui/themed";
import { primaryColor } from "@/constants/Colors";
import useHandleReserve from "@/hooks/useHandleReserve";
import useThemeColor from "@/hooks/useThemeColor";
import DateTimePicker from "@react-native-community/datetimepicker";

import IconInput from "@/components/inputs/IconInput";
import dayjs from "dayjs";
import DropdownSubject from "@/components/dropdowns/DropdownSubject";
import DropdownCourse from "@/components/dropdowns/DropdownCourse";
import useDatePicker from "@/hooks/pickers/useDatePicker";
import useTimePicker from "@/hooks/pickers/useTimePicker";
import DropdownRooms from "../dropdowns/DropdownRooms";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";
import useCheckForOverlap from "@/hooks/queries/bookedRooms/useCheckOverlap";
import useInsertBookedRooms from "@/hooks/queries/bookedRooms/useInsertBookedRooms";

const FABbooking = () => {
  const [visible, setVisible] = React.useState(false);
  const [courseAndSection, setCourseAndSection] = React.useState<string>("");
  const [subjectCode, setSubjectCode] = React.useState<string>("");
  const [rooms, setRooms] = React.useState<any>([]);

  const datePicker = useDatePicker();
  const timeInPicker = useTimePicker();
  const timeOutPicker = useTimePicker();

  const dayjs = require("dayjs");
  require("dayjs/plugin/timezone");
  require("dayjs/plugin/utc");

  // Load plugins
  dayjs.extend(require("dayjs/plugin/timezone"));
  dayjs.extend(require("dayjs/plugin/utc"));

  const localTimeIn = dayjs(timeInPicker.time).tz("Asia/Manila").format();
  const localTimeOut = dayjs(timeOutPicker.time).tz("Asia/Manila").format();

  const { session } = useAuth();
  const router = useRouter();

  const handleReserve = async () => {
    if (
      !subjectCode ||
      !courseAndSection ||
      !datePicker.date ||
      !timeInPicker.time ||
      !timeOutPicker.time
    ) {
      Alert.alert("Please fill the information properly!");
      return;
    }

    if (dayjs(timeInPicker.time).isSame(dayjs(timeOutPicker.time))) {
      Alert.alert("Reserve time-in and time-out cannot be the same!");
      return;
    }

    if (
      dayjs(timeInPicker.time) > dayjs(timeOutPicker.time) &&
      dayjs(timeOutPicker.time) < dayjs(timeInPicker.time)
    ) {
      Alert.alert("It's impossible to book that time!");
      return;
    }

    try {
      const { bookedRooms, schedule } = await useCheckForOverlap(
        rooms.value,
        dayjs(datePicker.date).format("DD MMMM YYYY"),
        localTimeIn,
        localTimeOut
      );
      if (!bookedRooms || !schedule) {
        Alert.alert("The room has already ongoing schedule!");
        return;
      }

      const insert = useInsertBookedRooms(
        session?.user.id,
        rooms.value,
        dayjs(datePicker.date).format("DD MMMM YYYY"),
        subjectCode,
        courseAndSection,
        localTimeIn,
        localTimeOut,
        "PENDING RESERVE"
      );
      onSuccess((await insert).id);
      console.log(localTimeIn);
      console.log(localTimeOut);
    } catch (error) {
      Alert.alert("Error, please contact the administrator");
      console.log(error);
    }
  };

  const onSuccess = (id: string) => {
    if (id) {
      router.replace({
        pathname: "/screens/bookingReceipt/[id]",
        params: {
          id: id,
          subjectCode: subjectCode,
          courseAndSection: courseAndSection,
          date: dayjs(datePicker.date).format("DD MMMM YYYY"),
          timeIn: dayjs(timeInPicker.time).format("HH:mm a"),
          timeOut: dayjs(timeOutPicker.time).format("HH:mm a"),
          roomId: rooms.roomId,
          roomCategory: rooms.roomCategory,
          roomImage: rooms.roomImage,
          roomName: rooms.roomName,
          customRoute: "/(tabs)",
        },
      });
    } else {
      Alert.alert("Cannot redirect");
    }
  };

  return (
    <>
      <FAB
        icon={{ name: "add", color: "white" }}
        color={primaryColor}
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          zIndex: 999,
        }}
        onPress={() => setVisible(true)}
      />
      <Modal visible={visible} style={{ flex: 1 }}>
        <View style={styles.container}>
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
          <DropdownSubject value={subjectCode} onChange={setSubjectCode} />
          <DropdownCourse
            value={courseAndSection}
            onChange={setCourseAndSection}
          />
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
          <Pressable style={styles.pressable} onPress={handleReserve}>
            <Text style={styles.text}>Reserve</Text>
          </Pressable>
          <Pressable style={styles.pressable} onPress={() => setVisible(false)}>
            <Text style={styles.text}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

export default FABbooking;

const styles = StyleSheet.create({
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
