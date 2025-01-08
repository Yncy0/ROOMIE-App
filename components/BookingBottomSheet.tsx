import React from "react";
import { XStack, YStack } from "tamagui";
import { BottomSheetView } from "@gorhom/bottom-sheet";

import IconInput from "./IconInput";

export default function BookingBottomSheet() {
  return (
    <BottomSheetView
      style={{
        flex: 1,
        backgroundColor: "white",
        height: "50%",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 50,
      }}
    >
      <YStack miw="100%" alignItems="center" gap={20}>
        <IconInput icon={"book"} placeholder="Subject Name" />
        <IconInput icon={"people-alt"} placeholder="Course & Section" />
        <IconInput icon={"calendar-today"} placeholder="Date" />
        <XStack gap={20}>
          <IconInput icon={"schedule"} placeholder="Time-in" />
          <IconInput icon={"schedule"} placeholder="Time-out" />
        </XStack>
      </YStack>
    </BottomSheetView>
  );
}
