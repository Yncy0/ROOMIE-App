import React from "react";
import { Button, XStack, YStack } from "tamagui";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import DatePicker from "react-native-date-picker";

import IconInput from "./IconInput";

export default function BookingBottomSheet() {
  const [date, setDate] = React.useState(new Date());
  const [openDate, setOpenDate] = React.useState(false);
  const [openTime, setOpenTime] = React.useState(false);

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
          open={openDate}
          date={date}
          onConfirm={(date) => {
            setOpenDate(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpenDate(false);
          }}
        />
        <DatePicker
          modal
          open={openTime}
          date={date}
          mode="time"
          onConfirm={(date) => {
            setOpenTime(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpenTime(false);
          }}
        />
        <IconInput icon={"book"} placeholder="Subject Name" />
        <IconInput icon={"people-alt"} placeholder="Course & Section" />
        <IconInput
          icon={"calendar-today"}
          placeholder="Date"
          onPress={() => setOpenDate(true)}
          date={date}
        />
        <XStack gap={20}>
          <IconInput
            icon={"schedule"}
            placeholder="Time-in"
            onPress={() => setOpenTime(true)}
          />
          <IconInput
            icon={"schedule"}
            placeholder="Time-out"
            onPress={() => setOpenTime(true)}
          />
        </XStack>
        <Button miw={"100%"} backgroundColor={"$blue10"} color={"$white1"}>
          Reserve
        </Button>
      </YStack>
    </BottomSheetView>
  );
}
