import { PropsWithChildren } from "react";
import { Modal, Pressable, View } from "react-native";
import IconTextInput from "./IconTextInput";


type Props = PropsWithChildren<{
    isVisible: boolean,
    onClose?: () => void,
}>;

export default function BookingModal({ isVisible, onClose }: Props) {
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View
                style={{
                    width: '100%',
                    height: '62%',
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: 'black'
                }}
            >
                <Pressable 
                    onPress={onClose}
                    style={{
                        backgroundColor: 'white',
                        width: 100,
                        height: 100
                    }}
                />
                <IconTextInput icon="accesibility" placeholder="Subject Name" width={100}/>
            </View>
        </Modal>
    )
}