import { Image } from "expo-image";
import { Card, Text, YStack } from "tamagui";

import { IconText } from "../IconText";
import { primaryColor } from "@/constants/Colors";

type Props = {
  items: any;
};

export default function BookedCard({ items }: Props) {
  return (
    <Card
      flexDirection="row"
      alignItems="center"
      backgroundColor={primaryColor}
      borderRadius={10}
      gap={20}
      paddingHorizontal={15}
      minHeight={150}
      elevation={10}
    >
      <Image
        source={items.room_image}
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
        }}
      />
      <YStack gap={5}>
        <Text color={"$white1"}>{items.room_name}</Text>
        <Text color={"$white1"}>{items.room_category}</Text>
        <IconText icon="albums-outline" text={items.subject} />
        <IconText icon="people-outline" text={items.section} />
        <IconText
          icon="time-outline"
          text={`${items.time_in}-${items.time_out}`}
        />
      </YStack>
    </Card>
  );
}
