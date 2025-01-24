import useThemeColor from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

type Props = {
  onPress: () => void;
  size?: number;
};

export default function BackButton({ onPress, size }: Props) {
  const { themeTextStyle } = useThemeColor();

  return (
    <Pressable onPress={onPress}>
      <Ionicons
        name={"arrow-back-circle-sharp"}
        size={size ? size : 32}
        color={themeTextStyle.color}
      />
    </Pressable>
  );
}
