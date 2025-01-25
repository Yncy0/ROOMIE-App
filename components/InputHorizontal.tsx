import useThemeColor from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  description: string;
  value: string;
  onChangeText: (text: string) => void;
  onPress?: () => void;
  placeholder?: string;
};

const InputHorizontal = ({
  description,
  value,
  onChangeText,
  onPress,
  placeholder,
}: Props) => {
  const { themeTextStyle } = useThemeColor();

  return (
    <View style={styles.container}>
      <Text style={themeTextStyle}>{description}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onPress={onPress}
        style={themeTextStyle}
        placeholder={placeholder}
      />
    </View>
  );
};

export default InputHorizontal;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomColor: "#636c72",
    paddingBottom: 5,
  },
});
