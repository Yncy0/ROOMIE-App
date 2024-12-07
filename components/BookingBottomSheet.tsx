import React, { PropsWithChildren } from "react";
import { Modal, Pressable, View } from "react-native";
import IconTextInput from "./IconTextInput";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";


type Props = PropsWithChildren<{
    isVisible?: boolean,
    onClose?: () => void,
}>;

export default function BookingBottomSheet({ isVisible, onClose }: Props) {  
    

    return (
        <BottomSheetView
            style={{
                backgroundColor:'white',
                width: '100%',
                height: 425
            }}
        >
            <IconTextInput icon={'accessibility'} placeholder="Subject Name" width={250}/>
        </BottomSheetView>
    )
}