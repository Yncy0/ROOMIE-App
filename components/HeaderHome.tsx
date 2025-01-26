import SearchButton from "@/components/buttons/SearchButton";
import useThemeColor from "@/hooks/useThemeColor";
import { router } from "expo-router";

import { StyleSheet, Text, View } from "react-native";

const HeaderHome = () => {
  const { themeTextStyle } = useThemeColor();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, themeTextStyle]}>Home</Text>
      {/* <SearchButton
        onPress={() => router.replace("/screens/search")}
        size={24}
      /> */}
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: "100%",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
