import useThemeColor from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Notifications() {
  const { themeContainerStyle, themeTextStyle } = useThemeColor();

  <SafeAreaProvider>
    <SafeAreaView style={[{ flex: 1 }, themeContainerStyle]}>
      <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>;
}
