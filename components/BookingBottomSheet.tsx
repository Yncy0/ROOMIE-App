import React from "react";
import { Button, XStack, YStack } from "tamagui";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import DatePicker from "react-native-date-picker";
import moment from "moment";

import IconInput from "./IconInput";
import useDatePicker from "@/hooks/useDatePicker";
import useTimePicker from "@/hooks/useTimePicker";
import useInsertBookedRooms from "@/hooks/useInsertBookedRooms";
import { useAuth } from "@/providers/AuthProvider";
import { Alert } from "react-native";
import { router } from "expo-router";
import useFetchBookedRooms from "@/hooks/useFetchBookedRooms";

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
  const [subjectName, setSubjectName] = React.useState<string>("");
  const [courseAndSection, setCourseAndSection] = React.useState<string>("");

  const datePicker = useDatePicker();
  const timeInPicker = useTimePicker();
  const timeOutPicker = useTimePicker();

  const { session } = useAuth();
  const { data } = useFetchBookedRooms();

  //FIXME: Too much logic code for the component
  const handleReserve = async () => {
    if (
      subjectName &&
      courseAndSection &&
      datePicker.date &&
      timeInPicker.time &&
      timeOutPicker.time
    ) {
      try {
        await useInsertBookedRooms(
          session?.user.id,
          roomId,
          moment(datePicker.date).format("DD MMMM YYYY"),
          subjectName,
          courseAndSection,
          moment(timeInPicker.time).format("LT"),
          moment(timeOutPicker.time).format("LT")
        );
        Alert.alert("Success");
        onSuccess();
      } catch (error) {
        Alert.alert("Error", (error as Error).message);
      }
    } else {
      Alert.alert("Please fill all the blanks!");
    }
  };

  //FIXME: Too much logic code for the component
  const onSuccess = () => {
    if (data && data.id) {
      router.replace({
        pathname: "/screens/bookingReceipt/[id]",
        params: {
          id: data.id,
          subjectName: subjectName,
          courseAndSection: courseAndSection,
          date: moment(datePicker.date).format("DD MMMM YYYY"),
          timeIn: moment(timeInPicker.time).format("LT"),
          timeOut: moment(timeOutPicker.time).format("LT"),
          roomId: roomId,
          roomCategory: roomCategory,
          roomImage: roomImage,
          roomName: roomName,
          customRoute: "/(tabs)",
        },
      });
    }
  };

  return (
    <BottomSheetView
      style={{
        flex: 1,
        backgroundColor: "white",
        minHeight: "50%",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 50,
      }}
    >
      <YStack miw="100%" alignItems="center" gap={20}>
        <DatePicker
          modal
          open={datePicker.open}
          date={datePicker.date}
          onConfirm={datePicker.onConfirm}
          onCancel={datePicker.onCancel}
        />
        <DatePicker
          modal
          open={timeInPicker.open}
          date={timeInPicker.time}
          mode="time"
          onConfirm={timeInPicker.onConfirm}
          onCancel={timeInPicker.onClose}
        />
        <DatePicker
          modal
          open={timeOutPicker.open}
          date={timeOutPicker.time}
          mode="time"
          onConfirm={timeOutPicker.onConfirm}
          onCancel={timeOutPicker.onClose}
        />
        <IconInput
          icon={"book"}
          placeholder="Subject Name"
          value={subjectName}
          onChangeText={setSubjectName}
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
          value={moment(datePicker.date).format("DD MMMM YYYY")}
          onChangeText={() => {}}
        />
        <XStack gap={20}>
          <IconInput
            icon={"schedule"}
            placeholder="Time-in"
            onPress={() => timeInPicker.setOpen(true)}
            value={moment(timeInPicker.time).format("LT")}
            onChangeText={() => {}}
          />
          <IconInput
            icon={"schedule"}
            placeholder="Time-out"
            onPress={() => timeOutPicker.setOpen(true)}
            value={moment(timeOutPicker.time).format("LT")}
            onChangeText={() => {}}
          />
        </XStack>
        <Button
          miw={"100%"}
          backgroundColor={"$blue10"}
          color={"$white1"}
          onPress={handleReserve}
        >
          Reserve
        </Button>
      </YStack>
    </BottomSheetView>
  );
};
