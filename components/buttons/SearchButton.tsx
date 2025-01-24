import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import useThemeColor from "@/hooks/useThemeColor";

type Props = {
  onPress: () => void;
  size: number;
};

const SearchButton = ({ onPress, size }: Props) => {
  const { themeTextStyle } = useThemeColor();

  return (
    <Pressable onPress={onPress}>
      <Ionicons name={"search"} size={size} color={themeTextStyle.color} />
    </Pressable>
  );
};

export default SearchButton;
