import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import React from "react";
import { Input, XStack, View } from "tamagui";

//TODO: Make a custome props for each value and onChange in <Input/>
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
        //FIXME: Value of Date and Time
        value={value}
        onChangeText={onChangeText}
        pl={40}
        onPress={onPress}
      />
    </XStack>
  );
}
