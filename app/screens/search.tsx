import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import IconInput from "@/components/inputs/IconInput";
import { View } from "react-native";

const Search = () => {
  const [search, onSearch] = React.useState<string>("");

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Stack.Screen options={{ headerShown: false }} />
        <View>
          <IconInput
            icon={"search"}
            placeholder="Search..."
            value={search}
            onChangeText={onSearch}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Search;
