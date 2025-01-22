import React from "react";
import AuthProvider from "@/providers/AuthProvider";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";
import { PortalProvider, TamaguiProvider } from "tamagui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import config from "../tamagui.config";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryCLient = new QueryClient();

  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // React.useEffect(() => {
  //   console.log("Starting effect");
  //   SplashScreen.preventAutoHideAsync().then(() => {
  //     console.log("Splash screen prevented from auto hiding");
  //   });

  //   setTimeout(() => {
  //     setStatusBarStyle("dark");
  //     console.log("Status bar style set to dark");
  //     SplashScreen.hideAsync().then(() => {
  //       console.log("Splash screen hidden");
  //     });
  //   }, 0);
  // }, []);

  return (
    <TamaguiProvider config={config}>
      <PortalProvider shouldAddRootHost>
        <AuthProvider>
          <QueryClientProvider client={queryCLient}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack>
          </QueryClientProvider>
        </AuthProvider>
      </PortalProvider>
    </TamaguiProvider>
  );
}
