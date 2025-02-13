import { View, Text, Modal, Pressable, StyleSheet, Alert } from "react-native";
import React from "react";
import { Dialog, FAB, Input } from "@rneui/themed";
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
import { useInsertBacklogs } from "@/hooks/queries/useInsertBacklogs";

const FABReport = () => {
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState("");

  const { themeTextStyle, themeInputStyle } = useThemeColor();

  const handleConfirm = () => {
    useInsertBacklogs("REPORT", text);
    setVisible(false);

    Alert.alert("Your report has been submitted, please wait for the action.");
  };

  return (
    <>
      <FAB
        icon={{ name: "report", color: "white" }}
        color={primaryColor}
        style={{
          position: "absolute",
          bottom: 0,
          right: 20,
          zIndex: 999,
        }}
        onPress={() => setVisible(true)}
      />
      <Dialog
        isVisible={visible}
        style={{ width: "100%" }}
        onBackdropPress={() => setVisible(false)}
      >
        <Dialog.Title title="Report Rooms" />
        <Input
          label="Please state your report"
          labelStyle={{ fontSize: 14 }}
          onChangeText={(text) => setText(text)}
          value={text}
          placeholder="The aircon is broken..."
          autoCapitalize={"none"}
          inputStyle={{ fontSize: 14, color: themeTextStyle.color }}
          inputContainerStyle={{
            borderBottomWidth: 0,
            backgroundColor: themeInputStyle.backgroundColor,
            paddingHorizontal: 15,
            borderRadius: 10,
          }}
        />
        <Dialog.Actions>
          <Dialog.Button onPress={handleConfirm}>Confirm</Dialog.Button>
          <Dialog.Button onPress={() => setVisible(false)}>
            Cancel
          </Dialog.Button>
        </Dialog.Actions>
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
