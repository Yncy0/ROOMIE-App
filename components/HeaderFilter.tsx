import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";

import IconButton from "./buttons/IconButton";
import useThemeColor from "@/hooks/useThemeColor";

type Props = {
  text: string;
};

const HeaderFilter = ({ text }: Props) => {
  const { themeTextStyle } = useThemeColor();

  const [selectedLanguage, setSelectedLanguage] = React.useState();

  return (
    <View style={styles.headerWrapper}>
      <Text style={themeTextStyle}>{text}</Text>
      <View style={styles.wrapper}>
        <IconButton
          name={"filter"}
          onPress={() => {}}
          size={16}
          color={themeTextStyle.color}
        />
        <Text>Filter</Text>
      </View>
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
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
