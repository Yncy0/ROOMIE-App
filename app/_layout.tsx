import React from "react";
import AuthProvider from "@/providers/AuthProvider";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SystemBars } from "react-native-edge-to-edge";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { Platform } from "react-native";
import * as TaskManager from "expo-task-manager";

import {
  useUpdateScheduleDone,
  useUpdateScheduleOngoing,
  useUpdateSchedulePendingClass,
} from "@/hooks/queries/schedule/useUpdateSchedule";
import { useUpdateBookedRoomStatus } from "@/hooks/queries/bookedRooms/useUpdateBookedRooms";
import { NotificationProvider } from "@/providers/NotificationProvider";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

// TaskManager.defineTask(
//   BACKGROUND_NOTIFICATION_TASK,
//   ({ data, error, executionInfo }) => {
//     console.log("✅ Received a notification in the background!", {
//       data,
//       error,
//       executionInfo,
//     });
//     // Do something with the notification data
//   }
// );

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryCLient = new QueryClient();
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    async function prepare() {
      try {
        // Simulate loading or perform actual loading tasks
        await new Promise((resolve) => setTimeout(resolve, 2000));

        await SplashScreen.hideAsync();

        console.log("Hiding SplashScreen top level _layout.tsx");
      } catch (error) {
        console.error("Error during preparation:", error);
      }
    }

    prepare();
  }, []);

  React.useEffect(() => {
    const updatesTick = setInterval(() => {
      useUpdateScheduleOngoing();
      useUpdateScheduleDone();
      useUpdateSchedulePendingClass();
      useUpdateBookedRoomStatus();
    }, 5000);
    return () => clearInterval(updatesTick);
  }, []);

  return (
    <NotificationProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SystemBars style="auto" />
        <AuthProvider>
          <QueryClientProvider client={queryCLient}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack>
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </NotificationProvider>
  );
}
