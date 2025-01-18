import React from "react";
import { FlatList, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import { View, Text } from "@tamagui/core";

import DateCard from "@/components/cards/DateCard";
import ScheduleText from "@/components/ScheduleText";
import { useFetchScheduleWithDay } from "@/hooks/queries/useFetchSchedule";
import EmptyDisplay from "@/components/EmptyDisplay";

const generateDatesForCurrentMonth = () => {
  const startOfMonth = moment().startOf("month");
  const endOfMonth = moment().endOf("month");
  const currentDate = moment();
  const dates = [];

  let date = startOfMonth;
  while (date <= endOfMonth) {
    if ((date = currentDate)) {
      dates.push(date.clone());
    }
    date.add(1, "day");
  }
  return dates;
};

export default function Schedule() {
  const [selectedDate, setSelectedDate] = React.useState<string>("");

  const selectedDateFormat = moment(selectedDate).format("dddd: DD MMMM YYYY");
  const currentDateFormat = moment().format("dddd: DD MMMM YYYY");
  const dates = generateDatesForCurrentMonth();

  const { data, error, isLoading } = useFetchScheduleWithDay(selectedDate);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text miw={"100%"} px={20} pb={20}>
            My Schedule
          </Text>
          <FlatList
            data={dates}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => (
              <DateCard
                date={item}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
            initialNumToRender={4}
          />
          <Text miw={"100%"} p={20} fow={"700"}>
            {currentDateFormat ? currentDateFormat : selectedDateFormat}
          </Text>
          <View px={20} gap={20}>
            {data && data.length > 0 ? (
              data.map((item) => <ScheduleText key={item.id} items={item} />)
            ) : (
              <EmptyDisplay />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
