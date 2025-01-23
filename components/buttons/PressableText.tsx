import useThemeColor from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

type Props = {
  text: string;
  onPress?: () => void;
};

export default function PressableText({ text, onPress }: Props) {
  const { themeContainerStyle, themeTextStyle } = useThemeColor();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#D9D9D9" : "white",
        },
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: 70,
          paddingHorizontal: 20,
        },
        themeContainerStyle,
      ]}
    >
      <Text style={[{ fontSize: 16 }, themeTextStyle]}>{text}</Text>
      <Ionicons name={"chevron-forward"} size={16} />
    </Pressable>
  );
}
