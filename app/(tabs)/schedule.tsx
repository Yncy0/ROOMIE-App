import React from "react";
import { FlatList, ScrollView, View, Text, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import dayjs from "dayjs";

import DateCard from "@/components/cards/DateCard";
import ScheduleText from "@/components/ScheduleText";
import { useFetchScheduleWithDay } from "@/hooks/queries/schedule/useFetchSchedule";
import EmptyDisplay from "@/components/EmptyDisplay";
import useSubscriptionSchedule from "@/hooks/queries/schedule/useSubscription";
import { useUpdateScheduleDone } from "@/hooks/queries/schedule/useUpdateSchedule";
import useThemeColor from "@/hooks/useThemeColor";
import {
  formatCompleteDate,
  generateDatesForCurrentMonth,
} from "@/utils/timeUtils";
import ScheduleSkeletonLoader from "@/components/loader/ScheduleSkeletonLoader";
import FABbooking from "@/components/buttons/FABbooking";

export default function Schedule() {
  // Initialize selectedDate to the current date
  const [selectedDate, setSelectedDate] = React.useState<string>(
    dayjs().format("YYYY-MM-DD")
  );

  //CALL REALTIME SUBSCRIPTION FROM SUPABASE
  useSubscriptionSchedule();

  const { themeTextStyle, themeBackgroundStyle } = useThemeColor();

  const selectedDateFormat = formatCompleteDate(selectedDate);
  const currentDateFormat = formatCompleteDate();
  const dates = generateDatesForCurrentMonth();

  const { data, error, isLoading } = useFetchScheduleWithDay(selectedDate);

  //TODO: change 60000 to 1000 during presentation
  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     useUpdateScheduleDone();
  //     console.log("UPDATED SCHEDULE");
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [data?.length]);

  useSubscriptionSchedule();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[themeBackgroundStyle, styles.container]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.header1, themeTextStyle]}>My Schedule</Text>
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
            {/**HUGE GAP */}
            <Text style={[styles.header2, themeTextStyle]}>
              {currentDateFormat ? currentDateFormat : selectedDateFormat}
            </Text>
            <View style={{ paddingHorizontal: 15, gap: 20, flex: 1 }}>
              {isLoading ? (
                <ScheduleSkeletonLoader />
              ) : error ? (
                <Text>Error loading data</Text>
              ) : data && data.length > 0 ? (
                data.map((item) => <ScheduleText key={item.id} items={item} />)
              ) : (
                <EmptyDisplay />
              )}
            </View>
          </View>
        </ScrollView>
        <FABbooking />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header1: {
    minWidth: "100%",
    paddingHorizontal: 15,
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
