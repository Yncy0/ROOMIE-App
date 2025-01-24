import useThemeColor from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  text: string;
  onPress?: () => void;
};

export default function PressableText({ text, onPress }: Props) {
  const { themeBackgroundStyle, themeTextStyle } = useThemeColor();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed
            ? "#D9D9D9"
            : themeBackgroundStyle.backgroundColor,
        },
        styles.pressable,
      ]}
    >
      <Text style={[styles.text, themeTextStyle]}>{text}</Text>
      <Ionicons
        name={"chevron-forward"}
        size={16}
        color={themeTextStyle.color}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 70,
    paddingHorizontal: 15,
  },
  text: { fontSize: 16 },
});
