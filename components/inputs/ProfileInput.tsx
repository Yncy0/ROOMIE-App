import { Ionicons } from "@expo/vector-icons";
import { Button, Input, XStack } from "tamagui";

type Props = {
  username: string;
  onChangeText: (text: string) => void;
};

const ProfileInput = ({ username, onChangeText }: Props) => {
  return (
    <XStack alignItems="center" gap={7} paddingHorizontal={20}>
      <Input
        flex={1}
        w={10}
        placeholder="Username"
        value={username}
        onChangeText={onChangeText}
        backgroundColor={"white"}
        borderColor={"white"}
        textAlign={"center"}
      />
      <Button icon={<Ionicons name={"pencil"} size={16} />} padding={5} />
      <Button icon={<Ionicons name={"checkmark-circle"} size={16} />} />
    </XStack>
  );
};

export default ProfileInput;
