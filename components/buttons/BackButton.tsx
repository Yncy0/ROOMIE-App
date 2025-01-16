import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

type Props = {
  onPress: () => void;
  color?: any;
  size?: number;
};

export default function BackButton({ onPress, color, size }: Props) {
  return (
    <Pressable onPress={onPress}>
      <Ionicons
        name={"arrow-back-circle-sharp"}
        size={size ? size : 32}
        color={color}
      />
    </Pressable>
  );
}
