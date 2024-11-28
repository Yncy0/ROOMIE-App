import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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
        <Text style={{width: '100%', paddingHorizontal: 20}}>My Schedule</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
