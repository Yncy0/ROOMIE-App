import React from "react";
import { Button, XStack, YStack } from "tamagui";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { MaterialIcons } from "@expo/vector-icons";
import DatePicker from "react-native-date-picker";

import IconInput from "./IconInput";

export default function BookingBottomSheet() {
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);

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
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <IconInput icon={"book"} placeholder="Subject Name" />
        <IconInput icon={"people-alt"} placeholder="Course & Section" />
        <Button
          icon={<MaterialIcons name={"calendar-today"} size={24} />}
          alignSelf="flex-start"
          justifyContent="flex-start"
          miw={"100%"}
          mih={50}
          onPress={() => setOpen(true)}
        >
          Date
        </Button>

        {/* <IconInput icon={"calendar-today"} placeholder="Date" /> */}
        <XStack gap={20}>
          <Button
            icon={<MaterialIcons name={"schedule"} size={24} />}
            alignSelf="flex-start"
            justifyContent="flex-start"
            mih={50}
            flex={1}
          >
            Time-in
          </Button>
          <Button
            alignSelf="flex-start"
            justifyContent="flex-start"
            mih={50}
            flex={1}
          >
            Time-out
          </Button>
          {/* <IconInput icon={"schedule"} placeholder="Time-in" />
          <IconInput icon={"schedule"} placeholder="Time-out" /> */}
        </XStack>
        <Button miw={"100%"} backgroundColor={"$blue10"} color={"$white1"}>
          Reserve
        </Button>
      </YStack>
    </BottomSheetView>
  );
}
