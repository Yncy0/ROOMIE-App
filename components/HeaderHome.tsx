import SearchButton from "@/components/buttons/SearchButton";
import { router } from "expo-router";

import { Text, View } from "react-native";

const HeaderHome = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        minWidth: "100%",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Home</Text>
      <SearchButton onPress={() => router.replace("/screens/search")} />
    </View>
  );
};

export default HeaderHome;
