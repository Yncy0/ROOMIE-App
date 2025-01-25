import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  description: string;
  value: string;
};

const TextHorizontal = ({ description, value }: Props) => {
  return (
    <View style={styles.container}>
      <Text>{description}</Text>
      <Text>{value}</Text>
    </View>
  );
};

export default TextHorizontal;

const styles = StyleSheet.create({
  container: { justifyContent: "space-between", flexDirection: "row" },
});
