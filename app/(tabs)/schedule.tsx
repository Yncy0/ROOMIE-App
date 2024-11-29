import HistoryStatus from "@/components/HistoryStatus";
import { FlatList, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import { DATA } from "@/data/DATA";
import DateCard from "@/components/DateCard";


const generateDatesForCurrentMonth = () => { 
  const startOfMonth = moment().startOf('month'); 
  const endOfMonth = moment().endOf('month'); 
  const dates = []; 
  
  let currentDate = startOfMonth; 
  while (currentDate <= endOfMonth) { 
      dates.push(currentDate.clone()); 
      currentDate.add(1, 'day'); 
    } 
  return dates; 
};

export default function Schedule() {
  const dates = generateDatesForCurrentMonth();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          gap: 20,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text style={{width: '100%', paddingHorizontal: 20, paddingTop: 20}}>History</Text>
        <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', width: '100%', paddingHorizontal: 20}}>
          <HistoryStatus status="Incoming" color="#FFDB5E"/>
          <HistoryStatus status="Completed" color="#81A4D8"/>
          <HistoryStatus status="Cancelled" color="#FF5C5C"/>
        </View>
        <Text style={{width: '100%', paddingHorizontal: 20}}>My Schedule</Text>
        <FlatList 
          data={dates} 
          keyExtractor={(item, index) => index.toString()} 
          renderItem={({ item }) => <DateCard date={item} />}  
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{gap: 10, paddingHorizontal: 20}}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
