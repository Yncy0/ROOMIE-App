import React from "react";
import { Pressable, Text, View } from "react-native";
import moment from "moment";

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
  const formatDate = moment(date).format("DD MMMM YYYY");
  const todayDate = moment().format("DD MMMM YYYY");
  const isSelected = formatDate === moment(selectedDate).format("DD MMMM YYYY");

  return (
    <Pressable
      onPress={() => setSelectedDate(date)}
      style={{
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#E8E8E8",
        borderRadius: 10,
        backgroundColor: isSelected
          ? "blue"
          : formatDate === todayDate
          ? "red"
          : "white",
        height: 90,
        width: 60,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "700" }}>
        {moment(date).format("ddd")}
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "800" }}>
        {moment(date).format("DD")}
      </Text>
    </Pressable>
  );
}
