import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, useColorScheme } from "react-native";

type Props = {
  onPress: () => void;
  size?: number;
};

export default function BackButton({ onPress, size }: Props) {
  return (
    <Pressable onPress={onPress}>
      <Ionicons
        name={"arrow-back-circle-sharp"}
        size={size ? size : 32}
        color={"white"}
      />
    </Pressable>
  );
}
