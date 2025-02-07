import { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Button,
  Platform,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import useThemeColor from "@/hooks/useThemeColor";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFetchNotification } from "@/hooks/queries/useFetchNotifications";
import NotificationText from "@/components/NotificationText";
import { subscriptionNotification } from "@/hooks/queries/useSubscriptionNotification";
import FABbooking from "@/components/buttons/FABbooking";

export default function NotificationsPage() {
  const { themeBackgroundStyle } = useThemeColor();

  const { data } = useFetchNotification();

  subscriptionNotification();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[{ flex: 1, paddingHorizontal: 10 }, themeBackgroundStyle]}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <FlatList
            data={data}
            contentContainerStyle={styles.list}
            renderItem={({ item }) =>
              item.body ? <NotificationText items={item} /> : null
            }
          />
        </View>
      </SafeAreaView>
      <FABbooking />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
