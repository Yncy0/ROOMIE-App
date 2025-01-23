import React from "react";
import { Text, View } from "react-native";

type Props = {
  description: string;
  value: string;
};

const TextHorizontal = ({ description, value }: Props) => {
  return (
    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
      <Text>{description}</Text>
      <Text>{value}</Text>
    </View>
  );
};

export default TextHorizontal;
