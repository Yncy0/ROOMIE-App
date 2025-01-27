import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";

import IconButton from "./buttons/IconButton";
import useThemeColor from "@/hooks/useThemeColor";
import FilterButton from "./buttons/FilterButton";

type Props = {
  text: string;
};

const HeaderFilter = ({ text }: Props) => {
  const { themeTextStyle } = useThemeColor();

  const [selectedLanguage, setSelectedLanguage] = React.useState();

  return (
    <View style={styles.headerWrapper}>
      <Text style={themeTextStyle}>{text}</Text>
      <FilterButton />
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
    alignItems: "center",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
