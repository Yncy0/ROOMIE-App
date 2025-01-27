import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
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

const FABbooking = () => {
  const [visible, setVisible] = React.useState(false);
  const [courseAndSection, setCourseAndSection] = React.useState<string | null>(
    ""
  );
  const [subjectCode, setSubjectCode] = React.useState<string | null>("");

  const { themeBackgroundStyle } = useThemeColor();

  return (
    <>
      <FAB
        icon={{ name: "add", color: "white" }}
        color={primaryColor}
        style={{
          alignSelf: "flex-end",
          padding: 20,
          backgroundColor: "transparent",
          zIndex: 999,
        }}
        onPress={() => setVisible(true)}
      />
      <Modal visible={visible}>
        <View style={styles.container}>
          {/* {datePicker.open && (
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
            )} */}
          <DropdownSubject value={subjectCode} onChange={setSubjectCode} />
          <DropdownCourse
            value={courseAndSection}
            onChange={setCourseAndSection}
          />
          {/* <IconInput
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
            </View> */}
          <Pressable style={styles.pressable} onPress={() => {}}>
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
