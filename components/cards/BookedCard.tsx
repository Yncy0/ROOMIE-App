import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { IconText } from "../IconText";
import { primaryColor } from "@/constants/Colors";
import { formatTimeMeridian } from "@/utils/timeUtils";
import useSubscriptionBookedRoom from "@/hooks/queries/bookedRooms/useSubscription";
import { router } from "expo-router";
import { Badge } from "@rneui/themed";

type Props = {
  items: any;
};

export default function BookedCard({ items }: Props) {
  if (!items || !items.rooms) {
    return null;
  }

  const onPress = () => {
    router.replace({
      pathname: "/screens/bookingPreview/[id]",
      params: {
        id: items.id,
        roomId: items.room_id,
        roomImage: items.rooms.room_image,
      },
    });
  };

  useSubscriptionBookedRoom();

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        source={
          items.rooms.room_image
            ? { uri: items.rooms.room_image }
            : require("@/assets/images/image-placeholder.png")
        }
        style={styles.image}
      />
      <View style={styles.container1}>
        <Badge value={items.status} />
        <Text style={styles.text}>{items.rooms?.room_name}</Text>
        <Text style={styles.text}>{items.rooms?.room_type}</Text>
        <IconText icon="albums-outline" text={items.subject_code} />
        <IconText icon="people-outline" text={items.course_and_section} />
        <IconText
          icon="time-outline"
          text={`${formatTimeMeridian(items.time_in)} - ${formatTimeMeridian(
            items.time_out
          )}`}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: primaryColor,
    borderRadius: 10,
    gap: 20,
    paddingHorizontal: 15,
    minHeight: 150,
    minWidth: 300,
    elevation: 10,
  },
  status: {
    color: primaryColor,
    backgroundColor: "white",
    position: "absolute",
    top: -23,
    zIndex: 999,
    width: 140,
    fontSize: 12,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  container1: {
    gap: 3,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  text: {
    color: "white",
  },
});
