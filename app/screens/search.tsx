import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";
import { Stack } from "expo-router";

import FilterButton from "@/components/buttons/FilterButton";
import IconInput from "@/components/IconInput";

const Search = () => {
  const [search, onSearch] = React.useState<string>("");

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Stack.Screen options={{ headerShown: false }} />
        <YStack>
          <XStack alignItems="center" gap={10} pt={5} px={5}>
            <IconInput
              icon={"search"}
              placeholder="Search..."
              value={search}
              onChangeText={onSearch}
            />
            <FilterButton color="#2B32B2" />
          </XStack>
        </YStack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Search;
