import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { Input, XStack } from "tamagui";

type Props = {
  username: string;
  onChangeText: (text: string) => void;
  onPress: () => void;
};

const ProfileInput = ({ username, onChangeText, onPress }: Props) => {
  return (
    <XStack>
      <Input value={username || ""} onChangeText={onChangeText} />
      <Pressable onPress={onPress}>
        <Ionicons name={"pencil-outline"} size={24} />
      </Pressable>
    </XStack>
  );
};

export default ProfileInput;
