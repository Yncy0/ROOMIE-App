import HistoryStatus from "@/components/HistoryStatus";
import { FlatList, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import { View, Text } from "@tamagui/core";

import DateCard from "@/components/cards/DateCard";
import ScheduleText from "@/components/ScheduleText";
import useFetchSchedule from "@/hooks/queries/useFetchSchedule";

const generateDatesForCurrentMonth = () => {
  const startOfMonth = moment().startOf("month");
  const endOfMonth = moment().endOf("month");
  const dates = [];

  let currentDate = startOfMonth;
  while (currentDate <= endOfMonth) {
    dates.push(currentDate.clone());
    currentDate.add(1, "day");
  }
  return dates;
};

export default function Schedule() {
  const dates = generateDatesForCurrentMonth();

  const { scheduleWithDateQuery } = useFetchSchedule();

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
            History
          </Text>
          <View fd={"row"} jc={"space-between"} miw={"100%"} px={20} pb={40}>
            <HistoryStatus status="Incoming" color="#FFDB5E" />
            <HistoryStatus status="Completed" color="#2B32B2" />
            <HistoryStatus status="Cancelled" color="#FF5C5C" />
          </View>
          <Text miw={"100%"} px={20} pb={20}>
            My Schedule
          </Text>
          <FlatList
            data={dates}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => <DateCard date={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10, paddingHorizontal: 20 }}
            pagingEnabled
            initialNumToRender={4}
          />
          <Text miw={"100%"} p={20} fow={"700"}>
            {moment().format("dddd: DD MMMM YYYY")}
          </Text>
          <View px={20} gap={20}>
            {/*RENDERING HERE*/}
            {scheduleWithDateQuery.data &&
              scheduleWithDateQuery.data.map((item) => (
                <ScheduleText key={item.id} items={item} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
