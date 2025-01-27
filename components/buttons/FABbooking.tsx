import { View, Text, Modal, Pressable } from "react-native";
import React from "react";
import { FAB } from "@rneui/themed";
import { primaryColor } from "@/constants/Colors";

const FABbooking = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <FAB
        icon={{ name: "add", color: "white" }}
        color={primaryColor}
        style={{
          alignSelf: "flex-end",
          padding: 20,
          backgroundColor: "transparent",
          zIndex: 999,
        }}
        onPress={() => setVisible(true)}
      />
      <Modal visible={visible}>
        <View style={{ width: 250, height: 250 }}>
          <Text>MODAL TEST</Text>
          <Pressable onPress={() => setVisible(false)}>
            <Text>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

export default FABbooking;
