import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { IconText } from "../IconText";
import { primaryColor } from "@/constants/Colors";
import moment from "moment";
import dayjs from "dayjs";
import { formatTimeMeridian } from "@/utils/timeUtils";

type Props = {
  items: any;
};

export default function BookedCard({ items }: Props) {
  if (!items || !items.rooms) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image
        source={
          items.rooms.room_image
            ? { uri: items.rooms.room_image }
            : require("@/assets/images/image-placeholder.png")
        }
        style={styles.image}
      />
      <View style={styles.container1}>
        <Text style={styles.text}>{items.rooms.room_name}</Text>
        <Text style={styles.text}>{items.rooms.room_type}</Text>
        <IconText icon="albums-outline" text={items.subject_code} />
        <IconText icon="people-outline" text={items.course_and_section} />
        <IconText
          icon="time-outline"
          text={`${formatTimeMeridian(items.time_in)} - ${formatTimeMeridian(
            items.time_out
          )}`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: primaryColor,
    borderRadius: 10,
    gap: 20,
    paddingHorizontal: 15,
    minHeight: 150,
    elevation: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  container1: { gap: 5, flexDirection: "column" },
  text: { color: "white" },
});
