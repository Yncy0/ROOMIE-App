import HistoryStatus from "@/components/HistoryStatus";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import { DATA } from "@/data/DATA";
import DateCard from "@/components/DateCard";
import BookedCard from "@/components/BookedCard";
import ScheduleText from "@/components/ScheduleText";
import useFetchSchedule from "@/hooks/useFetchSchedule";

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

  const { data } = useFetchSchedule();

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
            style={{ width: "100%", paddingHorizontal: 20, paddingBottom: 20 }}
          >
            History
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              paddingHorizontal: 20,
              paddingBottom: 40,
            }}
          >
            <HistoryStatus status="Incoming" color="#FFDB5E" />
            <HistoryStatus status="Completed" color="#2B32B2" />
            <HistoryStatus status="Cancelled" color="#FF5C5C" />
          </View>
          <Text
            style={{ width: "100%", paddingHorizontal: 20, paddingBottom: 20 }}
          >
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
          <Text
            style={{
              width: "100%",
              padding: 20,
              fontWeight: "700",
            }}
          >
            {moment().format("dddd: DD MMMM YYYY")}
          </Text>
          <View style={{ paddingHorizontal: 20, gap: 20 }}>
            {data.map((item) => (
              <ScheduleText key={item.id} items={item} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
