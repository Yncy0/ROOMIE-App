import { View, Text, StyleSheet } from "react-native";
import React from "react";
import useThemeColor from "@/hooks/useThemeColor";

interface Props {
  items: any;
}

const NotificationText = ({ items }: Props) => {
  const { themeTextStyle, themeBackgroundStyle } = useThemeColor();

  const dayjs = require("dayjs");
  require("dayjs/plugin/timezone");
  require("dayjs/plugin/utc");

  dayjs.extend(require("dayjs/plugin/timezone"));
  dayjs.extend(require("dayjs/plugin/utc"));
  dayjs.extend(require("dayjs/plugin/relativeTime"));

  const currentTime = dayjs();

  const formatNotificationTime = (notificationTime: any) => {
    return dayjs(notificationTime).fromNow();
  };

  return (
    <View style={[styles.container, themeBackgroundStyle]}>
      <View style={styles.wrapper1}>
        <Text style={[styles.header1, themeTextStyle]}>{items.body}</Text>
        <Text style={[styles.text1, themeTextStyle]}>
          {formatNotificationTime(items.created_at)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 10,
    elevation: 10,
    minWidth: "100%",
    padding: 10,
  },
  wrapper1: {
    flex: 1,
    gap: 5,
    flexDirection: "column",
  },
  wrapper2: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  header1: {
    fontSize: 14,
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 12,
  },
  container1: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  text1: {
    fontSize: 12,
    textAlign: "left",
  },
});

export default NotificationText;
