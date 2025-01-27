import { View, Text, StyleSheet } from "react-native";
import React from "react";
import IconButton from "./buttons/IconButton";
import useThemeColor from "@/hooks/useThemeColor";

type Props = {
  text: string;
};

const HeaderFilter = ({ text }: Props) => {
  const { themeTextStyle } = useThemeColor();

  return (
    <View style={styles.headerWrapper}>
      <Text style={themeTextStyle}>{text}</Text>
      <IconButton
        name={"filter"}
        onPress={() => {}}
        size={20}
        color={themeTextStyle.color}
      />
    </View>
  );
};

export default HeaderFilter;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
});
