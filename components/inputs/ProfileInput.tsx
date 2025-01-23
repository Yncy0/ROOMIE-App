import useColorTheme from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View, TextInput } from "react-native";

type Props = {
  username: string;
  onChangeText: (text: string) => void;
  onPress: () => void;
};

const ProfileInput = ({ username, onChangeText, onPress }: Props) => {
  const { themeContainerStyle, themeTextStyle } = useColorTheme();

  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <TextInput
        style={themeTextStyle}
        value={username || ""}
        onChangeText={onChangeText}
      />
      <Pressable onPress={onPress}>
        <Ionicons name={"pencil-outline"} size={16} />
      </Pressable>
    </View>
  );
};

export default ProfileInput;
