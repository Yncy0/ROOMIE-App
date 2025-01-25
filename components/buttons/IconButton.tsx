import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  name: any;
  size: number;
  onPress: () => void;
};

const IconButton = ({ name, size, onPress }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={name} size={size} color={"white"} />
    </Pressable>
  );
};

export default IconButton;
