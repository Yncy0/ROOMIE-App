import { Ionicons } from "@expo/vector-icons";
import { Text, XStack } from "tamagui";

type Props = {
  icon: any;
  text: string;
};

export const IconText = ({ icon, text }: Props) => {
  return (
    <XStack
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
      }}
    >
      <Ionicons name={icon} size={14} color={"#fff"} />
      <Text color={"$white1"}>{text}</Text>
    </XStack>
  );
};
