import useThemeColor from "@/hooks/useThemeColor";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, TextInput } from "react-native";

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
  const { themeInputStyle, themeTextStyle, themePlaceholder } = useThemeColor();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: 50,
        backgroundColor: themeInputStyle.backgroundColor,
        borderRadius: 50,
      }}
    >
      <View style={{ position: "absolute", left: 10, zIndex: 100 }}>
        <MaterialIcons name={icon} size={24} color={themeTextStyle.color} />
      </View>
      <TextInput
        style={{ paddingLeft: 40, flex: 1, color: themeTextStyle.color }}
        placeholder={placeholder}
        placeholderTextColor={themePlaceholder.color}
        value={value}
        onChangeText={onChangeText}
        onPress={onPress}
      />
    </View>
  );
}
