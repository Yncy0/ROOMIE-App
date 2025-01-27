import { View, Text } from "react-native";
import React from "react";
import { FAB } from "@rneui/themed";
import { primaryColor } from "@/constants/Colors";

const FABbooking = () => {
  return (
    <FAB
      icon={{ name: "add", color: "white" }}
      color={primaryColor}
      style={{
        alignSelf: "flex-end",
        padding: 20,
        backgroundColor: "transparent",
        zIndex: 999,
      }}
    />
  );
};

export default FABbooking;
