import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TextInput } from "react-native";
import { Input, XStack, View } from "tamagui";

type Props = {
  icon: any;
  placeholder: string;
};

export default function IconInput({ icon, placeholder }: Props) {
  const [text, setText] = React.useState<string>("");

  return (
    <XStack flex={1} alignItems="center" justifyContent="flex-start" mih={50}>
      <View position="absolute" left={10} zIndex={100}>
        <MaterialIcons name={icon} size={24} />
      </View>
      <Input
        flex={1}
        placeholder={placeholder}
        value={text}
        onChangeText={setText}
        pl={40}
      />
    </XStack>
  );
}
