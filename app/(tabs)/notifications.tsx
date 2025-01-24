import useThemeColor from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Notifications() {
  const { themeBackgroundStyle, themeTextStyle } = useThemeColor();

  <SafeAreaProvider>
    <SafeAreaView style={[styles.container, themeBackgroundStyle]}>
      <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
