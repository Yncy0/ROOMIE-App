import React from "react";
import AuthProvider from "@/context/AuthProvider";
import { Stack } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";
import { TamaguiProvider } from "@tamagui/core";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) return null;

  React.useEffect(() => {
    setTimeout(() => {
      setStatusBarStyle("dark");
    }, 0);
  }, []);

  return (
    <AuthProvider>
      <TamaguiProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </TamaguiProvider>
    </AuthProvider>
  );
}
