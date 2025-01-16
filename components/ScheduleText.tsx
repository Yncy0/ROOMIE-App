import { XStack, YStack, Text, Separator, View } from "tamagui";

type Props = {
  items: any;
};

export default function ScheduleText({ items }: Props) {
  return (
    <XStack
      alignItems="center"
      justifyContent="center"
      backgroundColor={"$white1"}
      borderRadius={10}
      elevation={1}
      minWidth={"100%"}
      padding={15}
    >
      <YStack flex={1} gap={5}>
        <View>
          <Text fontSize={14} fontWeight="bold">
            {items.subject.subject_code}
          </Text>
          <Text fontSize={12}>{items.subject.subject_name}</Text>
        </View>
        <Separator />
        <XStack justifyContent="space-between">
          <Text
            fontSize={12}
          >{`${items.course.course_name} ${items.course.course_year}${items.course.course_section} `}</Text>
          <Text fontSize={12}>{`${items.time_in}-${items.time_out}`}</Text>
        </XStack>
      </YStack>
    </XStack>
  );
}
