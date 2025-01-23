import { Image } from "expo-image";
import { Text, View } from "react-native";

import { IconText } from "../IconText";
import { primaryColor } from "@/constants/Colors";
import moment from "moment";
import dayjs from "dayjs";

type Props = {
  items: any;
};

export default function BookedCard({ items }: Props) {
  if (!items || !items.rooms) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: primaryColor,
        borderRadius: 10,
        gap: 20,
        paddingHorizontal: 15,
        minHeight: 150,
        elevation: 10,
      }}
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
      <View style={{ gap: 5, flexDirection: "column" }}>
        <Text style={{ color: "white" }}>{items.rooms.room_name}</Text>
        <Text style={{ color: "white" }}>{items.rooms.room_type}</Text>
        <IconText icon="albums-outline" text={items.subject_code} />
        <IconText icon="people-outline" text={items.course_and_section} />
        <IconText
          icon="time-outline"
          text={`${dayjs(items.time_in).format("HH:mm a")} - ${dayjs(
            items.time_out
          ).format("HH:mm a")}`}
        />
      </View>
    </View>
  );
}
