import React from "react";
import { Pressable, StyleSheet } from "react-native";
import dayjs from "dayjs";
import { View, Text } from "react-native";
import { primaryColor } from "@/constants/Colors";
import useThemeColor from "@/hooks/useThemeColor";

type Props = {
  date: any;
  selectedDate: any;
  setSelectedDate: (date: any) => void;
};

export default function DateCard({
  date,
  selectedDate,
  setSelectedDate,
}: Props) {
  const formatDate = dayjs(date).format("DD MMMM YYYY");
  const todayDate = dayjs().format("DD MMMM YYYY");
  const isSelected = formatDate === dayjs(selectedDate).format("DD MMMM YYYY");

  const { themeTextStyle, themeContainerStyle } = useThemeColor();

  return (
    <Pressable onPress={() => setSelectedDate(date)}>
      <View
        style={[
          {
            backgroundColor: isSelected
              ? primaryColor
              : formatDate === todayDate
              ? "gray"
              : themeContainerStyle.backgroundColor,
          },
          styles.container,
        ]}
      >
        <Text
          style={[
            {
              color: isSelected
                ? "white"
                : formatDate === todayDate
                ? "white"
                : themeTextStyle.color,
            },
            styles.header1,
          ]}
        >
          {dayjs(date).format("ddd")}
        </Text>
        <Text
          style={[
            {
              color: isSelected
                ? "white"
                : formatDate === todayDate
                ? "white"
                : themeTextStyle.color,
            },
            styles.subHeader,
          ]}
        >
          {dayjs(date).format("DD")}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 4,
    height: 90,
    width: 60,
  },
  header1: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 900,
  },
});
