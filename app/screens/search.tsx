import React from "react";
import { View, BackHandler } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Stack, router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

import IconInput from "@/components/inputs/IconInput";

const Search = () => {
  const [search, onSearch] = React.useState<string>("");

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        router.replace("/(tabs)");
        return true; // Return true to prevent default behavior
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

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
