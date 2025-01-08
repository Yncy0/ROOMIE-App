import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";
import { Input } from "tamagui";

type Props = {
  icon: any;
  placeholder: string;
};

export default function IconTextInput({ icon, placeholder }: Props) {
  const [text, setText] = React.useState<string>("");

  return (
    <View
      style={{
        flex: 1,
        maxWidth: "100%",
        minWidth: "49%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
        gap: 20,
        paddingHorizontal: 10,
        minHeight: 50,
      }}
    >
      <MaterialIcons name={icon} size={24} />
      <Input
        style={{ width: "100%", height: 40 }}
        placeholder={placeholder}
        value={text}
        onChangeText={setText}
      />
    </View>
  );
}
