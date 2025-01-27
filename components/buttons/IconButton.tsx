import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  color?: string;
  name: any;
  size: number;
  onPress: () => void;
}

const IconButton = ({ name, size, onPress, color }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;
