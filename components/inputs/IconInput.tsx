import useThemeColor from "@/hooks/useThemeColor";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

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
  const { themeInputStyle, themeTextStyle } = useThemeColor();

  return (
    <View style={[styles.container, themeInputStyle]}>
      <View style={styles.wrapper}>
        <MaterialIcons name={icon} size={24} color={themeTextStyle.color} />
      </View>
      <TextInput
        style={[styles.text, themeTextStyle]}
        placeholder={placeholder}
        placeholderTextColor={"#636c72"}
        value={value}
        onChangeText={onChangeText}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: 50,

    borderRadius: 50,
  },
  wrapper: { position: "absolute", left: 10, zIndex: 100 },
  text: { paddingLeft: 40, flex: 1 },
});
