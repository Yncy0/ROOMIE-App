import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { 
  Text, 
  View, 
  TextInput,
} from "react-native";
import Searchbar from "@/components/Searchbar";
import FilterButton from "@/components/FilterButton";

export default function Index() {

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff"
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: "center"
          }}
        >
          <Searchbar placeholder="Search"/>
          <FilterButton color="#2B32B2"/>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
