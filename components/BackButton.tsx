import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

type Props = {
  onPress?: () => void;
};

export default function BackButton({ onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={"arrow-back-circle-sharp"} size={32} color="white" />
    </Pressable>
  );
}
