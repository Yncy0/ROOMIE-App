import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";

import IconInput from "./inputs/IconInput";
import useHandleReserve from "@/hooks/useHandleReserve";
import { primaryColor } from "@/constants/Colors";
import dayjs from "dayjs";
import useThemeColor from "@/hooks/useThemeColor";

type Props = {
  roomId: any;
  roomName: string;
  roomCategory: string;
  roomImage: string;
};

export const BookingBottomSheet = ({
  roomId,
  roomName,
  roomCategory,
  roomImage,
}: Props) => {
  const {
    subjectCode,
    setSubjectCode,
    courseAndSection,
    setCourseAndSection,
    datePicker,
    timeInPicker,
    timeOutPicker,
    handleReserve,
  } = useHandleReserve({ roomId, roomName, roomCategory, roomImage });

  const { themeBackgroundStyle } = useThemeColor();

  if (datePicker.open) console.log(datePicker.open);

  return (
    <BottomSheetView style={[styles.bottomSheet, themeBackgroundStyle]}>
      <View style={styles.container}>
        {datePicker.open && (
          <DateTimePicker
            mode="date"
            value={datePicker.date}
            display="calendar"
          />
        )}
        {timeInPicker.open && (
          <DateTimePicker
            mode="time"
            value={datePicker.date}
            display="spinner"
          />
        )}
        {timeOutPicker.open && (
          <DateTimePicker
            mode="time"
            value={datePicker.date}
            display="spinner"
          />
        )}
        <IconInput
          icon={"book"}
          placeholder="Subject Name"
          value={subjectCode}
          onChangeText={setSubjectCode}
        />
        <IconInput
          icon={"people-alt"}
          placeholder="Course & Section"
          value={courseAndSection}
          onChangeText={setCourseAndSection}
        />
        <IconInput
          icon={"calendar-today"}
          placeholder="Date"
          onPress={() => datePicker.setOpen(true)}
          value={dayjs(datePicker.date).format("DD MMMM YYYY")}
          onChangeText={() => {}}
        />
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
      </View>
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    flex: 1,
    minHeight: "50%",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50,
  },
  container: {
    minWidth: "100%",
    alignItems: "center",
    gap: 20,
    flexDirection: "column",
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
