import React from "react";
import { Pressable } from "react-native";
import moment from "moment";
import { YStack, Text } from "tamagui";
import { primaryColor } from "@/constants/Colors";

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
    <Pressable onPress={() => setSelectedDate(date)}>
      <YStack
        alignItems="center"
        justifyContent="center"
        borderRadius={10}
        elevation={4}
        height={90}
        width={60}
        backgroundColor={
          isSelected
            ? primaryColor
            : formatDate === todayDate
            ? "$black10"
            : "$white1"
        }
      >
        <Text
          fos={16}
          fontWeight="bold"
          color={
            isSelected
              ? "$white1"
              : formatDate === todayDate
              ? "$white1"
              : "$black1"
          }
        >
          {moment(date).format("ddd")}
        </Text>
        <Text
          fos={16}
          fontWeight="900"
          color={
            isSelected
              ? "$white1"
              : formatDate === todayDate
              ? "$white1"
              : "$black1"
          }
        >
          {moment(date).format("DD")}
        </Text>
      </YStack>
    </Pressable>
  );
}
