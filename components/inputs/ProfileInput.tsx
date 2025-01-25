import useThemeColor from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View, TextInput, StyleSheet } from "react-native";

type Props = {
  username: string;
  onChangeText: (text: string) => void;
  onPress: () => void;
};

const ProfileInput = ({ username, onChangeText, onPress }: Props) => {
  const { themeTextStyle } = useThemeColor();

  return (
    <View style={styles.container}>
      <TextInput
        style={themeTextStyle}
        value={username || ""}
        onChangeText={onChangeText}
      />
      <Pressable onPress={onPress}>
        <Ionicons
          name={"pencil-outline"}
          size={16}
          color={themeTextStyle.color}
        />
      </Pressable>
    </View>
  );
};

export default ProfileInput;

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 10 },
});
