import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import React from "react";
import { Input, XStack, View } from "tamagui";

type Props = {
  icon: any;
  placeholder: string;
  date?: Date;
  onPress?: () => void;
};

export default function IconInput({ icon, placeholder, onPress, date }: Props) {
  const [text, setText] = React.useState<string>("");

  return (
    <XStack flex={1} alignItems="center" justifyContent="flex-start" mih={50}>
      <View position="absolute" left={10} zIndex={100}>
        <MaterialIcons name={icon} size={24} />
      </View>
      <Input
        flex={1}
        placeholder={placeholder}
        value={date ? moment().format("MMMM DD YYYY") : text}
        onChangeText={setText}
        pl={40}
        onPress={onPress}
      />
    </XStack>
  );
}
