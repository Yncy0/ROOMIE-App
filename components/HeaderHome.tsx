import SearchButton from "@/components/buttons/SearchButton";
import { router } from "expo-router";

import { Text } from "react-native";
import { XStack } from "tamagui";

const HeaderHome = () => {
  return (
    <XStack
      justifyContent="space-between"
      minWidth={"100%"}
      alignItems="center"
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Home</Text>
      <SearchButton onPress={() => router.replace("/screens/search")} />
    </XStack>
  );
};

export default HeaderHome;
