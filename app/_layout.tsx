import React from "react";
import AuthProvider from "@/providers/AuthProvider";
import { Stack } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";
import { PortalProvider, TamaguiProvider } from "tamagui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import config from "../tamagui.config";

export default function RootLayout() {
  const queryCLient = new QueryClient();

  React.useEffect(() => {
    setTimeout(() => {
      setStatusBarStyle("dark");
    }, 0);
  }, []);

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
