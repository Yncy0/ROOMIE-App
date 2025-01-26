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

  useUpdateScheduleDone();
  useUpdateScheduleOngoing();
  useUpdateBookedRoomStatus();

  React.useEffect(() => {
    async function prepare() {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading

      console.log("top level _layout.tsx is loaded");

      SplashScreen.hideAsync(); // Hide splash screen after async work
      console.log("Hiding SplashScreen top level _layout.tsx");
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
