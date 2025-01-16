import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Input, XStack, View } from "tamagui";

type Props = {
  icon: any;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onPress?: () => void;
};

export default function IconInput({
  icon,
  placeholder,
  onPress,
  value,
  onChangeText,
}: Props) {
  return (
    <XStack flex={1} alignItems="center" justifyContent="flex-start" mih={50}>
      <View position="absolute" left={10} zIndex={100}>
        <MaterialIcons name={icon} size={24} />
      </View>
      <Input
        flex={1}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        pl={40}
        onPress={onPress}
      />
    </XStack>
  );
}
