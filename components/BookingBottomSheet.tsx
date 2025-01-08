import React, { PropsWithChildren } from "react";
import { Modal, Pressable, View } from "react-native";
import { XStack, YStack } from "tamagui";

import IconTextInput from "./IconTextInput";
import { BottomSheetView } from "@gorhom/bottom-sheet";

export default function BookingBottomSheet() {
  return (
    <BottomSheetView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        width: "100%",
        height: "50%",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 50,
      }}
    >
      <YStack>
        <IconTextInput icon={"book"} placeholder="Subject Name" />
        <IconTextInput icon={"people-alt"} placeholder="Course & Section" />
        <IconTextInput icon={"calendar-today"} placeholder="Date" />
        <XStack miw="100%" justifyContent="space-between">
          <IconTextInput icon={"schedule"} placeholder="Time-in" />
          <IconTextInput icon={"schedule"} placeholder="Time-out" />
        </XStack>
      </YStack>
    </BottomSheetView>
  );
}
