import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import useThemeColor from "@/hooks/useThemeColor";

const EmptyDisplay = () => {
  const { themeTextStyle } = useThemeColor();

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/svg/booking_empty.svg")}
        style={styles.image}
      />
      <Text style={themeTextStyle}>Oops! It is empty</Text>
    </View>
  );
};

export default EmptyDisplay;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 50,
  },
  image: {
    width: 100,
    height: 100,
  },
});
