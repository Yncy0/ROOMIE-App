import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import React from "react";
import { Input, XStack, View } from "tamagui";

type Props = {
  icon: any;
  placeholder: string;
  date?: Date;
  time?: Date;
  onPress?: () => void;
};

export default function IconInput({
  icon,
  placeholder,
  onPress,
  date,
  time,
}: Props) {
  const [text, setText] = React.useState<string>("");
  const dateOrTime: string = "";

  if (date) dateOrTime == moment().format("MMMM DD YYYY");
  if (time) dateOrTime == moment().format("LT");

  return (
    <XStack flex={1} alignItems="center" justifyContent="flex-start" mih={50}>
      <View position="absolute" left={10} zIndex={100}>
        <MaterialIcons name={icon} size={24} />
      </View>
      <Input
        flex={1}
        placeholder={placeholder}
        //FIXME: Value of Date and Time
        value={date || time ? dateOrTime : text}
        onChangeText={setText}
        pl={40}
        onPress={onPress}
      />
    </XStack>
  );
}
