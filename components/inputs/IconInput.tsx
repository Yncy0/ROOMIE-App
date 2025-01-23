import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, TextInput } from "react-native";
import { Input } from "@rneui/themed";
import { bgGray500 } from "@/constants/Colors";

type Props = {
  icon: any;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onPress?: () => void;
};

export default function IconInput({
  icon,
  placeholder,
  onPress,
  value,
  onChangeText,
}: Props) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: 50,
        backgroundColor: bgGray500,
        borderRadius: 50,
      }}
    >
      <View style={{ position: "absolute", left: 10, zIndex: 100 }}>
        <MaterialIcons name={icon} size={24} />
      </View>
      <TextInput
        style={{ paddingLeft: 40, flex: 1 }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onPress={onPress}
      />
    </View>
  );
}
