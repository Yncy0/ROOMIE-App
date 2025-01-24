import React from "react";
import { Pressable } from "react-native";
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
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          elevation: 4,
          height: 90,
          width: 60,
          backgroundColor: isSelected
            ? primaryColor
            : formatDate === todayDate
            ? "gray"
            : themeContainerStyle.backgroundColor,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: isSelected
              ? "white"
              : formatDate === todayDate
              ? "white"
              : themeTextStyle.color,
          }}
        >
          {dayjs(date).format("ddd")}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 900,
            color: isSelected
              ? "white"
              : formatDate === todayDate
              ? "white"
              : "black",
          }}
        >
          {dayjs(date).format("DD")}
        </Text>
      </View>
    </Pressable>
  );
}
