import React, { memo } from "react";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

import IconInput from "./inputs/IconInput";
import useHandleReserve from "@/hooks/useHandleReserve";
import { primaryColor } from "@/constants/Colors";
import dayjs from "dayjs";
import useThemeColor from "@/hooks/useThemeColor";
import DropdownSubject from "./dropdowns/DropdownSubject";
import DropdownCourse from "./dropdowns/DropdownCourse";
import { uploadFiles } from "@/utils/tus";

type Props = {
  roomId: any;
  roomName: string;
  roomCategory: string;
  roomImage: string;
};

const BookingBottomSheet = ({
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
  const [uploading, setUploading] = React.useState(false);

  const askPermission = async (failureMessage: any, permissionRequest: any) => {
    const { status } = await permissionRequest();

    if (status === "denied") {
      alert(failureMessage);
    }
  };

  const pickDoc = async () => {
    let pickerResult = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      multiple: true,
    });

    handleAssetsPicked(pickerResult);
  };

  const handleAssetsPicked = async (pickerResult: any) => {
    try {
      setUploading(true);

      if (!pickerResult.canceled) {
        await uploadFiles("tus", pickerResult);
      }
    } catch (e) {
      console.log({ e });
      alert("Upload failed, sorry :(");
    } finally {
      setUploading(false);
    }
  };

  const maybeRenderUploadingIndicator = () => {
    if (uploading) {
      return <ActivityIndicator animating size="large" color="#0000ee" />;
    }
  };

  const maybeRenderControls = () => {
    if (!uploading) {
      return (
        <View>
          <View style={{ marginVertical: 8 }}>
            <Button onPress={pickDoc} title="Pick a document" />
          </View>
        </View>
      );
    }
  };

  return (
    <BottomSheetView style={[styles.bottomSheet, themeBackgroundStyle]}>
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

        <DropdownSubject value={subjectCode} onChange={setSubjectCode} />

        <DropdownCourse
          value={courseAndSection}
          onChange={setCourseAndSection}
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

        {maybeRenderControls()}
        {maybeRenderUploadingIndicator()}

        <Pressable style={styles.pressable} onPress={handleReserve}>
          <Text style={styles.text}>Reserve</Text>
        </Pressable>
      </View>
    </BottomSheetView>
  );
};

export default memo(BookingBottomSheet);

const styles = StyleSheet.create({
  bottomSheet: {
    flex: 1,
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
