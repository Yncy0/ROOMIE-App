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
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
    </Stack>
  );
}
