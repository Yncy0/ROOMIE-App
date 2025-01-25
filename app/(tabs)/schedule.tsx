import React from "react";
import { FlatList, ScrollView, View, Text, StyleSheet } from "react-native";
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
import useThemeColor from "@/hooks/useThemeColor";
import {
  formatCompleteDate,
  generateDatesForCurrentMonth,
} from "@/utils/timeUtils";

export default function Schedule() {
  const [selectedDate, setSelectedDate] = React.useState<string>("");

  const { themeTextStyle, themeBackgroundStyle } = useThemeColor();

  const selectedDateFormat = formatCompleteDate(selectedDate);
  const currentDateFormat = formatCompleteDate();
  const dates = generateDatesForCurrentMonth();

  const { data, error, isLoading } = useFetchScheduleWithDay(selectedDate);

  useSubscriptionSchedule();

  //TODO: change 60000 to 1000 during presentation
  React.useEffect(() => {
    const interval = setInterval(() => {
      useUpdateScheduleOngoing();
      useUpdateScheduleDone();
      console.log("UPDATED SCHEDULE");
    }, 60000);
    return () => clearInterval(interval);
  }, [data?.length]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, themeBackgroundStyle]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.container, themeTextStyle]}>My Schedule</Text>
          <FlatList
            data={dates}
            keyExtractor={(item, index) => item.toString()}
            renderItem={({ item }) => (
              <DateCard
                date={item}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            initialNumToRender={4}
          />
          <Text style={[styles.header2, themeTextStyle]}>
            {currentDateFormat ? currentDateFormat : selectedDateFormat}
          </Text>
          <View style={{ paddingHorizontal: 20, gap: 20 }}>
            {isLoading ? (
              <Text>Loading...</Text>
            ) : error ? (
              <Text>Error loading data</Text>
            ) : data && data.length > 0 ? (
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

const styles = StyleSheet.create({
  container: { flex: 1 },
  header1: {
    minWidth: "100%",
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  header2: {
    minWidth: "100%",
    padding: 15,
    fontWeight: 700,
  },
  listContainer: {
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
