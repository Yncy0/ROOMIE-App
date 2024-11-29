import HistoryStatus from "@/components/HistoryStatus";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { DATA } from "@/data/DATA";

export default function Schedule() {
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
        <Text style={{width: '100%', paddingHorizontal: 20}}>History</Text>
        <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', width: '100%', paddingHorizontal: 20}}>
          <HistoryStatus status="Incoming" color="#FFDB5E"/>
          <HistoryStatus status="Completed" color="#81A4D8"/>
          <HistoryStatus status="Cancelled" color="#FF5C5C"/>
        </View>
        <Text style={{width: '100%', paddingHorizontal: 20}}>My Schedule</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
