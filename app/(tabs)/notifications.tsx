import useColorTheme from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Notifications() {
  const { themeContainerStyle, themeTextStyle } = useColorTheme();

  <SafeAreaProvider>
    <SafeAreaView style={[{ flex: 1 }, themeContainerStyle]}>
      <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>;
}
