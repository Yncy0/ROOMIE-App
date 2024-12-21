import AuthProvider from "@/context/AuthProvider";
import { Stack } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";
import React from "react";

export default function RootLayout() {
  React.useEffect(() => {
    setTimeout(() => {
      setStatusBarStyle("dark");
    }, 0);
  }, []);

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      </Stack>
    </AuthProvider>
  );
}
