import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  icon: any;
  text: string;
};

export const IconText = ({ icon, text }: Props) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={14} color={"#fff"} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  text: { color: "white" },
});
