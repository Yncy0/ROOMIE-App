import React from "react";
import { Text, XStack } from "tamagui";

type Props = {
  description: string;
  value: string;
};

const TextHorizontal = ({ description, value }: Props) => {
  return (
    <XStack justifyContent="space-between">
      <Text>{description}</Text>
      <Text>{value}</Text>
    </XStack>
  );
};

export default TextHorizontal;
