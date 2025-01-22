import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";
import { Stack } from "expo-router";

import IconInput from "@/components/inputs/IconInput";

const Search = () => {
  const [search, onSearch] = React.useState<string>("");

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Stack.Screen options={{ headerShown: false }} />
        <YStack>
          <IconInput
            icon={"search"}
            placeholder="Search..."
            value={search}
            onChangeText={onSearch}
          />
        </YStack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Search;
