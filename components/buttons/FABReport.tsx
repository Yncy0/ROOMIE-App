import { View, Text, Modal, Pressable, StyleSheet, Alert } from "react-native";
import React from "react";
import { Dialog, FAB } from "@rneui/themed";
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

const FABReport = () => {
  const [visible, setVisible] = React.useState(false);

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
      <Dialog isVisible={visible} onBackdropPress={() => setVisible(false)}>
        <Dialog.Title title="Dialog Title" />
        <Text>Dialog body text. Add relevant information here.</Text>
      </Dialog>
    </>
  );
};

export default FABReport;

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
