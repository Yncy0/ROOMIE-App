import React, { PropsWithChildren } from "react";
import { Modal, Pressable, View } from "react-native";
import IconTextInput from "./IconTextInput";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import OvalButton from "./OvalButton";

export default function BookingBottomSheet() {
  return (
    <BottomSheetView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        width: "100%",
        height: 425,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 50,
      }}
    >
      <View style={{ width: "100%", gap: 20 }}>
        <IconTextInput icon={"book"} placeholder="Subject Name" />
        <IconTextInput icon={"people-alt"} placeholder="Course & Section" />
        <IconTextInput icon={"calendar-today"} placeholder="Date" />
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <IconTextInput icon={"schedule"} placeholder="Time-in" />
          <IconTextInput icon={"schedule"} placeholder="Time-out" />
        </View>
      </View>
      <OvalButton text="Reserve" color="black" height={50} width={250} />
    </BottomSheetView>
  );
}
