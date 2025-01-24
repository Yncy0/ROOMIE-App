import SearchButton from "@/components/buttons/SearchButton";
import useThemeColor from "@/hooks/useThemeColor";
import { router } from "expo-router";

import { Text, View } from "react-native";

const HeaderHome = () => {
  const { themeContainerStyle, themeTextStyle } = useThemeColor();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        minWidth: "100%",
        alignItems: "center",
      }}
    >
      <Text style={[{ fontSize: 20, fontWeight: "bold" }, themeTextStyle]}>
        Home
      </Text>
      {/* <SearchButton
        onPress={() => router.replace("/screens/search")}
        size={24}
      /> */}
    </View>
  );
};

export default HeaderHome;
