import useThemeColor from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Notifications() {
  const { themeBackgroundStyle, themeTextStyle } = useThemeColor();

  <SafeAreaProvider>
    <SafeAreaView
      style={{ flex: 1, backgroundColor: themeBackgroundStyle.backgroundColor }}
    >
      <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>;
}
