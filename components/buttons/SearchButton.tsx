import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onPress: () => void;
  size?: number;
};

const SearchButton = ({ onPress, size }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={"search"} size={24} color={"black"} />
    </Pressable>
  );
};

export default SearchButton;
