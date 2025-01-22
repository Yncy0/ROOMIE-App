import { Image } from "expo-image";
import { Card, Text, YStack } from "tamagui";

import { IconText } from "../IconText";
import { primaryColor } from "@/constants/Colors";
import moment from "moment";

type Props = {
  items: any;
};

export default function BookedCard({ items }: Props) {
  if (!items || !items.rooms) {
    return null;
  }

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
        source={
          items.rooms.room_image
            ? { uri: items.rooms.room_image }
            : require("@/assets/images/image-placeholder.png")
        }
        style={{
          width: 120,
          height: 120,
          borderRadius: 10,
        }}
      />
      <YStack gap={5}>
        <Text color={"$white1"}>{items.rooms.room_name}</Text>
        <Text color={"$white1"}>{items.rooms.room_type}</Text>
        <IconText icon="albums-outline" text={items.subject_code} />
        <IconText icon="people-outline" text={items.course_and_section} />
        <IconText
          icon="time-outline"
          text={`${moment(items.time_in).format("LT")}-${moment(
            items.time_out
          ).format("LT")}`}
        />
      </YStack>
    </Card>
  );
}
