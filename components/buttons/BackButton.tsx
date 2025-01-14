import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

type Props = {
  onPress: () => void;
  color?: any;
};

export default function BackButton({ onPress, color }: Props) {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={"arrow-back-circle-sharp"} size={32} color={color} />
    </Pressable>
  );
}
