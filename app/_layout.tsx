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
import {
  useUpdateScheduleDone,
  useUpdateScheduleOngoing,
} from "@/hooks/queries/schedule/useUpdateSchedule";
import { useUpdateBookedRoomStatus } from "@/hooks/queries/bookedRooms/useUpdateBookedRooms";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryCLient = new QueryClient();
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    async function prepare() {
      try {
        // Simulate loading or perform actual loading tasks
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("top level _layout.tsx is loaded");

        await useUpdateScheduleDone();
        await useUpdateScheduleOngoing();
        await useUpdateBookedRoomStatus();

        console.log("UPDATED");

        // Hide splash screen after async work
        await SplashScreen.hideAsync();
        console.log("Hiding SplashScreen top level _layout.tsx");
      } catch (error) {
        console.error("Error during preparation:", error);
      }
    }

    prepare();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryCLient}>
        <SystemBars style="auto" />
        <AuthProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
