import React from "react";
import { FlatList, ScrollView, View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import dayjs from "dayjs";

import DateCard from "@/components/cards/DateCard";
import ScheduleText from "@/components/ScheduleText";
import { useFetchScheduleWithDay } from "@/hooks/queries/schedule/useFetchSchedule";
import EmptyDisplay from "@/components/EmptyDisplay";
import useSubscriptionSchedule from "@/hooks/queries/schedule/useSubscription";
import {
  useUpdateScheduleDone,
  useUpdateScheduleOngoing,
} from "@/hooks/queries/schedule/useUpdateSchedule";

const generateDatesForCurrentMonth = () => {
  const startOfMonth = dayjs().startOf("month");
  const endOfMonth = dayjs().endOf("month");
  const currentDate = dayjs();
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

  const selectedDateFormat = dayjs(selectedDate).format("dddd: DD MMMM YYYY");
  const currentDateFormat = dayjs().format("dddd: DD MMMM YYYY");
  const dates = generateDatesForCurrentMonth();

  const { data, error, isLoading } = useFetchScheduleWithDay(selectedDate);

  useSubscriptionSchedule();

  React.useEffect(() => {
    const interval = setInterval(() => {
      useUpdateScheduleOngoing();
      useUpdateScheduleDone();
      console.log("UPDATED SCHEDULE");
    }, 60000);
    return () => clearInterval(interval);
  }, [data]);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              minWidth: "100%",
              paddingHorizontal: 20,
              paddingBottom: 20,
            }}
          >
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
          <Text style={{ minWidth: "100%", padding: 20, fontWeight: 700 }}>
            {currentDateFormat ? currentDateFormat : selectedDateFormat}
          </Text>
          <View style={{ paddingHorizontal: 20, gap: 20 }}>
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
