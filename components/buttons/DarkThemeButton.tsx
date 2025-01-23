import { View, Text, Switch } from "react-native";
import React from "react";

const DarkThemeButton = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        minWidth: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Switch />
      <Text>DarkThemeButton</Text>
    </View>
  );
};

export default DarkThemeButton;
